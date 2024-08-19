import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/Users/userSlice';
import shoppingListReducer from './Features/shoppingList/shoppingListSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        shoppingList: shoppingListReducer,
    },
});

export default store;
