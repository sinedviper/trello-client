import { DetailedHTMLProps, HTMLAttributes } from "react";
import { List } from "../../interfaces";

export interface ListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  list: List;
  provided: any;
  handleUpdateList: Function;
  handleRemoveList: Function;
}
