import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as Remove } from "./Remove.svg";
import { HomeProps } from "./Home.props";
import { useAppDispatch, useAppSelector } from "../../hooks/useHooks";
import {
  actionAddBoard,
  actionRemoveBoard,
  selectAllBoard,
} from "../../features";

import styles from "./Home.module.css";

interface data {
  id: string;
  name: string;
}

export const Home = ({ className, ...props }: HomeProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector(selectAllBoard);

  const [create, setCreate] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleCreate = () => {
    setOpen(false);
    setCreate("");
    dispatch(actionAddBoard(create));
  };

  const handleRemove = (id: string) => {
    dispatch(actionRemoveBoard(id));
  };

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
        {board.map((val: data) => (
          <div key={val.id} className={styles.board}>
            <div>
              <Link to={`/board/${val.id}`} className={styles.name}>
                {val.name}
              </Link>
            </div>
            <Remove
              className={styles.remove}
              onClick={() => handleRemove(val.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
