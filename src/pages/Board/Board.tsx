/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { BoardProps } from "./Board.props";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchBoard,
  fetchListCreate,
  fetchListRemove,
  fetchListUpdate,
  fetchTodos,
  fetchTodosCreate,
  fetchTodosDelete,
  selectBoard,
  selectTodos,
} from "../../features";

import { ReactComponent as Remove } from "./Remove.svg";
import styles from "./Board.module.css";
import "swiper/css";
import "swiper/css/pagination";

export const Board = ({ className, ...props }: BoardProps): JSX.Element => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);

  const { board } = useAppSelector(selectBoard);
  const { todos } = useAppSelector(selectTodos);

  const handleCreate = () => {
    setOpen(true);
    setName("");
    dispatch(fetchTodosCreate({ boardId, todos: { name, boardId } }));
  };

  const handleCreateList = (e, todosId: string) => {
    if (e.key === "Enter")
      dispatch(fetchListCreate({ boardId, todosId, name: e.target.value }));
  };

  const handleUpdateList = (id: string, check: boolean) => {
    dispatch(fetchListUpdate({ id, check: !check, boardId }));
  };

  const handleRemove = (id: string) => {
    dispatch(fetchTodosDelete({ id, boardId }));
  };

  const handleRemoveList = (id: string) => {
    dispatch(fetchListRemove({ id, boardId }));
  };

  useEffect(() => {
    dispatch(fetchBoard(String(boardId)));
    dispatch(fetchTodos(String(boardId)));
  }, []);

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={cn(styles.top)}>
        <h2>Board: {board && board.name}</h2>
        <Link to={`/`} className={styles.back}>
          Back
        </Link>
      </div>
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
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {todos &&
          todos.map((todo) => (
            <SwiperSlide key={todo.id} className={styles.board}>
              <Remove
                className={styles.remove}
                onClick={() => handleRemove(todo.id)}
              />
              <h3>{todo.name}</h3>
              <input onKeyDown={(e) => handleCreateList(e, todo.id)} />
              <ul>
                {todo.list &&
                  todo.list.map((list) => (
                    <li
                      key={list.id}
                      className={cn(styles.list, {
                        [styles.check]: list.check === true,
                      })}
                      onClick={() => handleUpdateList(list.id, list.check)}
                    >
                      <Remove
                        className={styles.removeList}
                        onClick={() => handleRemoveList(list.id)}
                      />
                      {list.name}
                    </li>
                  ))}
              </ul>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
