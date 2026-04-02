import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import catalogueReducer from './slices/catalogueSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    catalogue: catalogueReducer,
  },
});
