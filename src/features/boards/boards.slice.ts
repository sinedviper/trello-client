import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Board } from "../../interfaces";
import { AppState } from "../../store";
import { createBoards, getBoards, removeBoards } from "../../utils";

export const fetchBoards = createAsyncThunk(
  "@@boards/boards-all",
  async (): Promise<Board[]> => {
    return await getBoards();
  }
);
export const fetchBoardsDelete = createAsyncThunk(
  "@@boards/boards-delete",
  async (id: string): Promise<Board[]> => {
    await removeBoards(id);
    return await getBoards();
  }
);
export const fetchBoardsCreate = createAsyncThunk(
  "@@boards/boards-create",
  async (name: string): Promise<Board[]> => {
    await createBoards(name);
    return await getBoards();
  }
);

interface boardsState {
  boards: Board[];
  error: string;
  status: "idle" | "pending" | "received" | "rejected";
}

const initialState: boardsState = {
  boards: [],
  error: "",
  status: "idle",
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchBoards.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "received";
        state.boards = action.payload as unknown as Board[];
      })
      .addCase(fetchBoardsDelete.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBoardsDelete.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchBoardsDelete.fulfilled, (state, action) => {
        state.status = "received";
        state.boards = action.payload as unknown as Board[];
      })
      .addCase(fetchBoardsCreate.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBoardsCreate.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchBoardsCreate.fulfilled, (state, action) => {
        state.status = "received";
        state.boards = action.payload as unknown as Board[];
      });
  },
});

export const reducerBoards = boardsSlice.reducer;

export const selectBoards = (state: AppState) => state.boards;
