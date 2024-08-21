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
        
    },
    {
        meta: {
            offline: {
                effect: ({ userId, item }) => ({
                    url: 'http://localhost:8888/shoppingLists',
                    method: 'POST',
                    data: { ...item, userId },
                }),
                commit: { type: 'shoppingList/addItemCommit' },
                rollback: { type: 'shoppingList/addItemRollback' },
            },
        },
    }
);

// Update existing item
export const updateItem = createAsyncThunk(
    'shoppingList/updateItem',
    async ({ userId, itemId, updatedItem }) => {
        const itemWithUserId = { ...updatedItem, userId };
            const response = await axios.put(`http://localhost:8888/shoppingLists/${itemId}`, itemWithUserId);
            return response.data;
        
    },
    {
        meta: {
            offline: {
                effect: ({ userId, itemId, updatedItem }) => ({
                    url: `http://localhost:8888/shoppingLists/${itemId}`,
                    method: 'PUT',
                    data: { ...updatedItem, userId },
                }),
                commit: { type: 'shoppingList/updateItemCommit' },
                rollback: { type: 'shoppingList/updateItemRollback' },
            },
        },
    }
);

// Delete item
export const deleteItem = createAsyncThunk(
    'shoppingList/deleteItem',
    async (itemId) => {
        
            await axios.delete(`http://localhost:8888/shoppingLists/${itemId}`);
            return itemId;
        
    },
    {
        meta: {
            offline: {
                effect: ({ userId, itemId, updatedItem }) => ({
                    url: `http://localhost:8888/shoppingLists/${itemId}`,
                    method: 'PUT',
                    data: { ...updatedItem, userId },
                }),
                commit: { type: 'shoppingList/updateItemCommit' },
                rollback: { type: 'shoppingList/updateItemRollback' },
            },
        },
    }
);
