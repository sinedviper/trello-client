/* eslint-disable react-hooks/exhaustive-deps */
import cn from "classnames";

import { CreateBoardProps } from "./CreateBoard.props";

import styles from "./CreateBoard.module.css";

export const CreateBoard = ({
  className,
  open,
  setOpen,
  create,
  setCreate,
  handleCreate,
  ...props
}: CreateBoardProps): JSX.Element => {
  return (
    <div
      className={cn(className, styles.top, {
        [styles.openCreate]: open === true,
      })}
      {...props}
    >
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
  );
};
