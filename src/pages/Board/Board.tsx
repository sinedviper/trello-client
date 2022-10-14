import cn from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { BackCard, List, Todos, CreateTodo } from "../../components";
import { BoardProps } from "./Board.props";
import { useBoard } from "./useBoard";

import styles from "./Board.module.css";
import "swiper/css";
import "swiper/css/pagination";

export const Board = ({ className, ...props }: BoardProps): JSX.Element => {
  const {
    board,
    onDragEnd,
    todos,
    handleRemove,
    handleCreateList,
    handleRemoveList,
    handleUpdateList,
    open,
    setOpen,
    name,
    setName,
    handleCreate,
  } = useBoard();

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      {board && <BackCard board={board} />}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.lists}>
          {todos &&
            todos.map((todo) => (
              <Todos
                key={todo.id}
                todo={todo}
                handleRemove={handleRemove}
                handleCreateList={handleCreateList}
              >
                <Droppable droppableId={`${todo.id}`}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {todo.list &&
                        todo.list.map((list, index) => (
                          <Draggable
                            key={list.id}
                            draggableId={list.id}
                            index={index}
                          >
                            {(provided) => (
                              <List
                                provided={provided}
                                list={list}
                                handleRemoveList={handleRemoveList}
                                handleUpdateList={handleUpdateList}
                              />
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Todos>
            ))}
          <CreateTodo
            open={open}
            handleCreate={handleCreate}
            setOpen={setOpen}
            name={name}
            setName={setName}
          />
        </div>
      </DragDropContext>
    </div>
  );
};
