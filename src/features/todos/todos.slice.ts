/* eslint-disable array-callback-return */
import { updateListTodosId } from "./../../utils/list.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { List, Todos } from "../../interfaces";
import { AppState } from "../../store";
import {
  getTodos,
  removeTodos,
  createTodos,
  createList,
  updateListCheck,
  removeList,
} from "../../utils";

export const fetchTodos = createAsyncThunk(
  "@@todos/todos-all",
  async (id: string): Promise<Todos[]> => {
    return await getTodos(id);
  }
);
export const fetchTodosDelete = createAsyncThunk(
  "@@todos/todos-delete",
  async (data: any): Promise<Todos[]> => {
    await removeTodos(data.id);
    return await getTodos(data.boardId);
  }
);
export const fetchTodosCreate = createAsyncThunk(
  "@@todos/todos-create",
  async (data: any): Promise<Todos[]> => {
    await createTodos(data.todos.name, data.todos.boardId);
    return await getTodos(data.boardId);
  }
);

export const fetchListCreate = createAsyncThunk(
  "@@todos/list-create",
  async (data: any) => {
    await createList(data.name, data.todosId);
    return await getTodos(data.boardId);
  }
);

export const fetchListUpdate = createAsyncThunk(
  "@@todos/list-update",
  async (data: any) => {
    await updateListCheck(data.id, data.check);
    return await getTodos(data.boardId);
  }
);

export const fetchListRemove = createAsyncThunk(
  "@@todos/list-remove",
  async (data: any) => {
    await removeList(data.id);
    return await getTodos(data.boardId);
  }
);

export const fetchListTodosUpdate = createAsyncThunk(
  "@@todos/list-updateTodosId",
  async (data: any) => {
    await updateListTodosId(data.id, data.todosId);
    return await getTodos(data.boardId);
  }
);

interface todosState {
  todos: Todos[];
  error: string;
  status: "idle" | "pending" | "received" | "rejected";
}

const initialState: todosState = {
  todos: [],
  error: "",
  status: "idle",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    actionTodosClear: () => {
      return initialState;
    },
    actionListTodosId: (state, action) => {
      let obj: List | null = null;
      state.todos.map((todo) => {
        todo.list = todo.list.filter((list) => {
          if (list.id === action.payload.id) {
            list.todosId = action.payload.todosId;
            obj = list;
          }
          return list.id !== action.payload.id;
        });
        return todo;
      });
      state.todos = state.todos.map((todo) => {
        if (todo.id === obj?.todosId) {
          todo.list.push(obj);
        }
        return todo;
      });
      return state;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchTodos.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "received";
        state.error = "";
        state.todos = action.payload as unknown as Todos[];
      })
      .addCase(fetchTodosDelete.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchTodosDelete.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchTodosDelete.fulfilled, (state, action) => {
        state.status = "received";
        state.error = "";
        state.todos = action.payload as unknown as Todos[];
      })
      .addCase(fetchTodosCreate.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchTodosCreate.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchTodosCreate.fulfilled, (state, action) => {
        state.status = "received";
        state.error = "";
        state.todos = action.payload as unknown as Todos[];
      })
      .addCase(fetchListCreate.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchListCreate.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchListCreate.fulfilled, (state, action) => {
        state.status = "received";
        state.error = "";
        state.todos = action.payload as unknown as Todos[];
      })
      .addCase(fetchListUpdate.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchListUpdate.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchListUpdate.fulfilled, (state, action) => {
        state.status = "received";
        state.error = "";
        state.todos = action.payload as unknown as Todos[];
      })
      .addCase(fetchListTodosUpdate.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchListTodosUpdate.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchListTodosUpdate.fulfilled, (state, action) => {
        state.status = "received";
        state.error = "";
        state.todos = action.payload as unknown as Todos[];
      })
      .addCase(fetchListRemove.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(fetchListRemove.rejected, (state, action) => {
        state.status = "rejected";
        state.error = String(action.error.message);
      })
      .addCase(fetchListRemove.fulfilled, (state, action) => {
        state.status = "received";
        state.error = "";
        state.todos = action.payload as unknown as Todos[];
      });
  },
});

export const { actionTodosClear, actionListTodosId } = todosSlice.actions;

export const reducerTodos = todosSlice.reducer;

export const selectTodos = (state: AppState) => state.todos;
