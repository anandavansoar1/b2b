import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add additional reducers here when incorporating a real API (e.g., RTK Query api slices)
  },
  // Adding middleware for RTK Query in the future would look like: 
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
