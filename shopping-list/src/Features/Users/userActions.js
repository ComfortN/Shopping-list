import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Defining a thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://shopping-list-8u8c.onrender.com/users/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue('Error fetching user details. Please try again.');
        }
    }
);


// Defining a thunk for logging in the user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.get('https://shopping-list-8u8c.onrender.com/users');
            const users = response.data;

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                // Return user id if login is successful
                return { id: user.id, username: user.username };
            } else {
                return thunkAPI.rejectWithValue('Invalid username or password');
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('Error logging in. Please try again.');
        }
    }
);

// Defining a thunk for signing up the user
export const signupUser = createAsyncThunk(
    'user/signupUser',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.post('https://shopping-list-8u8c.onrender.com/users', {
                username,
                password,
            });

            // Return user id if signup is successful
            // return { id: response.data.id, username: response.data.username };
            return 'Signup successful!';
        } catch (error) {
            return thunkAPI.rejectWithValue('Error signing up. Please try again.');
        }
    }
);


export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ userData, imageFile }, { rejectWithValue }) => {
        try {
            let imageUrl = userData.image;
            
            // Handle image upload if there's a new image file
            if (imageFile) {
                // In a real application, you'd upload to a proper file server
                // For JSON Server, we'll convert to base64 to store the image data
                const base64Image = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(imageFile);
                });
                
                imageUrl = base64Image;
            }

            // Update user data including the image URL
            const response = await axios.put(`https://shopping-list-8u8c.onrender.com/users/${userData.id}`, {
                ...userData,
                image: imageUrl
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error updating user');
        }
    }
);