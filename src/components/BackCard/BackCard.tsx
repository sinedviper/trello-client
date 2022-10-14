import { Link } from "react-router-dom";

import { BackCardProps } from "./BackCard.props";

import styles from "./BackCard.module.css";

export const BackCard = ({
  board,
  className,
  ...props
}: BackCardProps): JSX.Element => {
  return (
    <div className={styles.top} {...props}>
      <h2>Board: {board && board.name}</h2>
      <Link to={`/`} className={styles.back}>
        Back
      </Link>
    </div>
  );
};
