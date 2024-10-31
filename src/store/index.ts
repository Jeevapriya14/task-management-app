import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer, // Ensure the key here matches your slice's name
  },
});

export type RootState = ReturnType<typeof store.getState>; // Export RootState type
export type AppDispatch = typeof store.dispatch; // Export AppDispatch type
export default store;
