import { Link } from "react-router-dom";

import { BoardProps } from "./Board.props";
import { RemoveIcon } from "../../assets";

import styles from "./Board.module.css";

export const Board = ({
  board,
  handleRemove,
  className,
  ...props
}: BoardProps): JSX.Element => {
  return (
    <div className={styles.board} {...props}>
      <div>
        <Link to={`/board/${board.id}`} className={styles.name}>
          {board.name}
        </Link>
      </div>
      <RemoveIcon
        className={styles.remove}
        onClick={() => handleRemove(board.id)}
      />
    </div>
  );
};
