/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as Remove } from "./Remove.svg";
import { HomeProps } from "./Home.props";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  actionBoardClear,
  actionTodosClear,
  fetchBoards,
  fetchBoardsCreate,
  fetchBoardsDelete,
  selectBoards,
} from "../../features";
import { Board } from "../../interfaces";

import styles from "./Home.module.css";

export const Home = ({ className, ...props }: HomeProps): JSX.Element => {
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

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={cn(styles.top, { [styles.openCreate]: open === true })}>
        <p
          onClick={() => !open && setOpen(!open)}
          className={cn(styles.title, { [styles.openTitle]: open === true })}
        >
          Create a new board
        </p>
        <div
          className={cn(styles.createBoard, {
            [styles.openBoard]: open === true,
          })}
        >
          <p>What shell we call the board ?</p>
          <input
            type='text'
            value={create}
            onChange={(e) =>
              setCreate(e.target.value.length >= 50 ? create : e.target.value)
            }
          />
          <div className={styles.createButton}>
            <button
              className={cn(styles.button, styles.cancel)}
              onClick={() => {
                setCreate("");
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button className={styles.button} onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        {boards &&
          boards.map((board: Board) => (
            <div key={board.id} className={styles.board}>
              <div>
                <Link to={`/board/${board.id}`} className={styles.name}>
                  {board.name}
                </Link>
              </div>
              <Remove
                className={styles.remove}
                onClick={() => handleRemove(board.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
