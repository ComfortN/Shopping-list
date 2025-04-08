import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//Fetch user items
export const fetchItems = createAsyncThunk('shoppingList/fetchItems', async () => {
    const response = await axios.get('https://shopping-list-8u8c.onrender.com/shoppingLists');
    return response.data;
});



// Add new item
export const addItem = createAsyncThunk(
    'shoppingList/addItem',
    async ({userId, item}) => {
        item.userId = userId;
        const response = await axios.post('https://shopping-list-8u8c.onrender.com/shoppingLists', item);
        return response.data;
        
    },
    {
        meta: {
            offline: {
                effect: ({ userId, item }) => ({
                    url: 'https://shopping-list-8u8c.onrender.com/shoppingLists',
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
            const response = await axios.put(`https://shopping-list-8u8c.onrender.com/shoppingLists/${itemId}`, itemWithUserId);
            return response.data;
        
    },
    {
        meta: {
            offline: {
                effect: ({ userId, itemId, updatedItem }) => ({
                    url: `https://shopping-list-8u8c.onrender.com/shoppingLists/${itemId}`,
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
        
            await axios.delete(`https://shopping-list-8u8c.onrender.com/shoppingLists/${itemId}`);
            return itemId;
        
    },
    {
        meta: {
            offline: {
                effect: ({ userId, itemId, updatedItem }) => ({
                    url: `https://shopping-list-8u8c.onrender.com/shoppingLists/${itemId}`,
                    method: 'PUT',
                    data: { ...updatedItem, userId },
                }),
                commit: { type: 'shoppingList/updateItemCommit' },
                rollback: { type: 'shoppingList/updateItemRollback' },
            },
        },
    }
);
