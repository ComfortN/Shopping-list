import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Defining a thunk for logging in the user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8888/users');
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
            const response = await axios.post('http://localhost:8888/users', {
                username,
                password,
            });

            // Return user id if signup is successful
            return { id: response.data.id, username: response.data.username };
        } catch (error) {
            return thunkAPI.rejectWithValue('Error signing up. Please try again.');
        }
    }
);
