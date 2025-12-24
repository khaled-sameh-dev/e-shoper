// import { configureStore } from '@reduxjs/toolkit';
// import filterReducer from './filterSlice';

// export const store = configureStore({
//   reducer: {
//     filter: filterReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer, // Add this line
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
