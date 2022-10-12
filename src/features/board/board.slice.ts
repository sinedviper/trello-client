import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Board } from "../../interfaces";
import { AppState } from "../../store";
import { getBoard } from "../../utils";

export const fetchBoard = createAsyncThunk(
  "@@board/board-id",
  async (id: string) => {
    return getBoard(id);
  }
);

interface boardState {
  board: Board | null;
  error: string;
  status: "idle" | "pending" | "received" | "rejected";
}

const initialState: boardState = {
  board: null,
  error: "",
  status: "idle",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    actionBoardClear: () => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchBoard.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.status = "received";
        state.board = action.payload as Board;
      });
  },
});

export const { actionBoardClear } = boardSlice.actions;

export const reducerBoard = boardSlice.reducer;

export const selectBoard = (state: AppState) => state.board;
