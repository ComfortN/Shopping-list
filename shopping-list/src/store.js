import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/Users/userSlice';
import shoppingListReducer from './Features/shoppingList/shoppingListSlice';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import axios from 'axios';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['shoppingList'], // Only persist the shoppingList reducer
};


// Creating a persisted reducer for the shoppingList
const persistedShoppingListReducer = persistReducer(persistConfig, shoppingListReducer);

export const store = configureStore({
    reducer: {
        user: userReducer,
        shoppingList: persistedShoppingListReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            
            serializableCheck: false,
        }),
});


export const persistor = persistStore(store);
export default store;
