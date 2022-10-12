import { configureStore } from "@reduxjs/toolkit";
import { reducerBoards, reducerBoard, reducerTodos } from "./features";

export const store = configureStore({
  reducer: {
    boards: reducerBoards,
    board: reducerBoard,
    todos: reducerTodos,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
