import cn from "classnames";

import { Board } from "../../interfaces";
import { Board as Boards, CreateBoard } from "../../components";
import { HomeProps } from "./Home.props";
import { useHome } from "./useHome";

import styles from "./Home.module.css";

export const Home = ({ className, ...props }: HomeProps): JSX.Element => {
  const {
    open,
    setOpen,
    create,
    setCreate,
    handleCreate,
    boards,
    handleRemove,
  } = useHome();

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <CreateBoard
        open={open}
        setOpen={setOpen}
        create={create}
        setCreate={setCreate}
        handleCreate={handleCreate}
      />
      <div className={styles.bottom}>
        {boards &&
          boards.map((board: Board) => (
            <Boards key={board.id} handleRemove={handleRemove} board={board} />
          ))}
      </div>
    </div>
  );
};
