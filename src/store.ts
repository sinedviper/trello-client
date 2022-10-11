import { configureStore } from "@reduxjs/toolkit";
import { reducerBoard } from "./features";

export const store = configureStore({
  reducer: {
    boards: reducerBoard,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
