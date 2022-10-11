/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";
import uniqid from "uniqid";

import { AppState } from "../../store";

// const fetchBoardById = createAsyncThunk(
//   "board/fetchById",
//   async (userId: number) => {}
// );

interface List {
  id: string;
  name: string;
  list: string[];
}

export interface Boards {
  id: string;
  name: string;
  boards: List[];
}

interface boardState {
  board: Boards[];
  loading: "idle" | "pending" | "received" | "reject";
}

const initialState = {
  board: [],
  loading: "idle",
} as boardState;

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    actionAddBoard: (state, action) => {
      state.board = [
        ...state.board,
        { id: uniqid(), name: action.payload, boards: [] },
      ];
    },
    actionRemoveBoard: (state, action) => {
      state.board = state.board.filter((obj) =>
        obj.id === action.payload ? null : obj
      );
    },
    actionAddListBoard: (state, action) => {
      state.board.map((obj: Boards): void => {
        if (obj.id === action.payload.id) {
          obj.boards = [
            ...obj.boards,
            { id: uniqid(), name: action.payload.name, list: [] },
          ];
        }
      });
    },
    actionAddTodoList: (state, action) => {
      state.board.map((obj: Boards): void => {
        if (obj.id === action.payload.idBoard) {
          obj.boards.map((list) => {
            if (list.id === action.payload.idList) {
              list.list = [...list.list, action.payload.todo];
            }
          });
        }
      });
    },
    actionRemoveBoardList: (state, action) => {
      state.board = state.board.map((obj: Boards) => {
        if (obj.id === action.payload.idBoard) {
          obj.boards = obj.boards.filter((list) => {
            console.log(list.id, action.payload.idList);
            if (list.id === action.payload.idList) {
              return null;
            }
          });
        }
        return obj;
      });
    },
  },
  extraReducers: {},
});

export const {
  actionAddBoard,
  actionRemoveBoard,
  actionAddListBoard,
  actionAddTodoList,
  actionRemoveBoardList,
} = boardSlice.actions;

export const reducerBoard = boardSlice.reducer;

export const selectAllBoard = (state: AppState) => state.boards;
export const selectBoard = (state: AppState, action: string) => {
  let list: Boards | undefined;
  state.boards.board.map((obj) => {
    if (obj.id === action) {
      list = obj;
    }
    return obj;
  });

  return list;
};
