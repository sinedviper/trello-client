/* eslint-disable react-hooks/exhaustive-deps */
import cn from "classnames";

import { CreateTodoProps } from "./CreateTodo.props";

import styles from "./CreateTodo.module.css";

export const CreateTodo = ({
  open,
  handleCreate,
  setOpen,
  name,
  setName,
  className,
  ...props
}: CreateTodoProps): JSX.Element => {
  return (
    <>
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
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <span>give me a name!</span>
          <div>
            <button onClick={() => setOpen(true)}>cancel</button>
            <button onClick={handleCreate}>create todo</button>
          </div>
        </div>
      )}
    </>
  );
};
