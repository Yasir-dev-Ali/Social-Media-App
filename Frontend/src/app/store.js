import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from '../features/auth/authSlice.js';
import postReducer from '../features/post/postSlice.js';
 const store = configureStore({
    reducer: {
         auth: authReducer,
        posts:postReducer
    },
 });
export default store;
