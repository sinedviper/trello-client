import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { Todos } from "../../interfaces";

export interface TodosProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  todo: Todos;
  handleRemove: Function;
  handleCreateList: Function;
  children: ReactNode;
}
