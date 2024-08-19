import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add new item
export const addItem = createAsyncThunk(
    'shoppingList/addItem',
    async (item, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8888/shoppingLists', item);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update existing item
export const updateItem = createAsyncThunk(
    'shoppingList/updateItem',
    async ({ id, ...item }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:8888/shoppingLists/${id}`, item);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete item
export const deleteItem = createAsyncThunk(
    'shoppingList/deleteItem',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8888/shoppingLists/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
