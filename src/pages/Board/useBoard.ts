/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  actionListTodosId,
  fetchBoard,
  fetchListCreate,
  fetchListRemove,
  fetchListTodosUpdate,
  fetchListUpdate,
  fetchTodos,
  fetchTodosCreate,
  fetchTodosDelete,
  selectBoard,
  selectTodos,
} from "../../features";

export const useBoard = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);

  const { board } = useAppSelector(selectBoard);
  const { todos } = useAppSelector(selectTodos);

  const handleCreate = () => {
    setOpen(true);
    setName("");
    dispatch(fetchTodosCreate({ boardId, todos: { name, boardId } }));
  };

  const handleCreateList = (e, todosId: string) => {
    if (e.key === "Enter") {
      dispatch(fetchListCreate({ boardId, todosId, name: e.target.value }));
      e.target.value = "";
    }
  };

  const handleUpdateList = (id: string, check: boolean) => {
    dispatch(fetchListUpdate({ id, check: !check, boardId }));
  };

  const handleRemove = (id: string) => {
    dispatch(fetchTodosDelete({ id, boardId }));
  };

  const handleRemoveList = (id: string) => {
    dispatch(fetchListRemove({ id, boardId }));
  };

  const onDragEnd = useCallback((result) => {
    dispatch(
      actionListTodosId({
        id: result.draggableId,
        todosId: result.destination.droppableId,
      })
    );
    dispatch(
      fetchListTodosUpdate({
        id: result.draggableId,
        todosId: result.destination.droppableId,
        boardId,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(fetchBoard(String(boardId)));
    dispatch(fetchTodos(String(boardId)));
  }, []);

  return {
    board,
    onDragEnd,
    todos,
    handleRemove,
    handleCreateList,
    handleRemoveList,
    handleUpdateList,
    open,
    setOpen,
    name,
    setName,
    handleCreate,
  };
};
