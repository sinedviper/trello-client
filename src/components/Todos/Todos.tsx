import { TodosProps } from "./Todos.props";
import { RemoveIcon } from "../../assets";

import styles from "./Todos.module.css";

export const Todos = ({
  todo,
  handleRemove,
  handleCreateList,
  children,
  className,
  ...props
}: TodosProps): JSX.Element => {
  return (
    <div key={todo.id} className={styles.board} {...props}>
      <RemoveIcon
        className={styles.remove}
        onClick={() => handleRemove(todo.id)}
      />
      <h3>{todo.name}</h3>
      <input onKeyDown={(e) => handleCreateList(e, todo.id)} />
      {children}
    </div>
  );
};
