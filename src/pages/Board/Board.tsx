/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";

import { BoardProps } from "./Board.props";
import { useAppDispatch, useAppSelector } from "../../hooks/useHooks";
import {
  selectBoard,
  Boards,
  actionAddListBoard,
  actionAddTodoList,
  actionRemoveBoardList,
} from "../../features";
import { ReactComponent as Remove } from "./Remove.svg";

import styles from "./Board.module.css";

export const Board = ({ className, ...props }: BoardProps): JSX.Element => {
  const [create, setCreate] = useState<string>("");
  const [list, setList] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  const { idBoard } = useParams();

  const dispatch = useAppDispatch();
  const data: Boards | undefined = useAppSelector((state) =>
    selectBoard(state, String(idBoard))
  );

  const handleCreate = () => {
    setOpen(true);
    dispatch(actionAddListBoard({ id: idBoard, name: create }));
  };

  const handleCreateList = (e, id: string) => {
    if (e.key === "Enter")
      dispatch(actionAddTodoList({ idBoard, idList: id, todo: list }));
  };

  const handleRemove = (id: string) => {
    dispatch(actionRemoveBoardList({ idBoard, idList: id }));
  };

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={cn(styles.top)}>
        <h2>Board: {data && data.name}</h2>
        <Link to={`/`} className={styles.back}>
          Back
        </Link>
      </div>
      <div className={styles.bottom}>
        {data?.boards &&
          data.boards.map((obj) => (
            <div key={obj.id} className={styles.board}>
              <Remove
                className={styles.remove}
                onClick={() => handleRemove(obj.id)}
              />
              <h3>{obj.name}</h3>
              <input
                value={list}
                onChange={(e) => setList(e.target.value)}
                onKeyDown={(e) => handleCreateList(e, obj.id)}
              />
              <ul>
                {obj.list.map((lists, index) => (
                  <li key={index}>{lists}</li>
                ))}
              </ul>
            </div>
          ))}
        {open ? (
          <button
            className={cn(styles.create, {
              [styles.open]: open === true,
            })}
            onClick={() => setOpen(!open)}
          >
            Create todo
          </button>
        ) : (
          <div className={styles.create}>
            <input value={create} onChange={(e) => setCreate(e.target.value)} />
            <span>give me a name!</span>
            <div>
              <button onClick={() => setOpen(true)}>cancel</button>
              <button onClick={handleCreate}>create todo</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
/*
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
</div>;
*/
