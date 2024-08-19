import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//Fetch user items
export const fetchItems = createAsyncThunk('shoppingList/fetchItems', async () => {
    const response = await axios.get('http://localhost:8888/shoppingLists');
    return response.data;
});



// Add new item
export const addItem = createAsyncThunk(
    'shoppingList/addItem',
    async ({userId, item}) => {
        item.userId = userId;
        const response = await axios.post('http://localhost:8888/shoppingLists', item);
        return response.data;
        
    }
);

// Update existing item
export const updateItem = createAsyncThunk(
    'shoppingList/updateItem',
    async ({ userId, itemId, updatedItem }) => {
        const itemWithUserId = { ...updatedItem, userId };
            const response = await axios.put(`http://localhost:8888/shoppingLists/${itemId}`, itemWithUserId);
            return response.data;
        
    }
);

// Delete item
export const deleteItem = createAsyncThunk(
    'shoppingList/deleteItem',
    async (itemId) => {
        
            await axios.delete(`http://localhost:8888/shoppingLists/${itemId}`);
            return itemId;
        
    }
);
