import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userInfoSlice from './slices/userInfoSlice';
import productSlice from './slices/productSlice';
import cart from './slices/cart';
import orderSlice from './slices/orderSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        userInfo: userInfoSlice,
        products: productSlice,
        cart: cart,
        order: orderSlice

    },
});

export default store;
