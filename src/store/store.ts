import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reduser/todo.slice";

export const store = configureStore({
  reducer: {
    user: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;