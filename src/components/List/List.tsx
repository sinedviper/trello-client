import cn from "classnames";

import { ListProps } from "./List.props";
import { RemoveIcon } from "../../assets";

import styles from "./List.module.css";

export const List = ({
  list,
  provided,
  handleUpdateList,
  handleRemoveList,
  className,
  ...props
}: ListProps): JSX.Element => {
  return (
    <div
      className={cn(styles.list, {
        [styles.check]: list.check === true,
      })}
      onClick={() => handleUpdateList(list.id, list.check)}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      {...props}
    >
      <RemoveIcon
        className={styles.removeList}
        onClick={() => handleRemoveList(list.id)}
      />
      {list.name}
    </div>
  );
};
