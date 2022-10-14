/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  selectBoards,
  fetchBoardsCreate,
  fetchBoardsDelete,
  fetchBoards,
  actionBoardClear,
  actionTodosClear,
} from "../../features";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const useHome = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector(selectBoards);

  const [create, setCreate] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleCreate = () => {
    setOpen(false);
    setCreate("");
    dispatch(fetchBoardsCreate(create));
  };

  const handleRemove = (id: string) => {
    dispatch(fetchBoardsDelete(id));
  };

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(actionBoardClear());
    dispatch(actionTodosClear());
  }, []);

  return {
    open,
    setOpen,
    create,
    setCreate,
    handleCreate,
    boards,
    handleRemove,
  };
};
