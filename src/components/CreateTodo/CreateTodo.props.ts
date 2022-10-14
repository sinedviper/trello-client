import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CreateTodoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open: boolean;
  handleCreate: VoidFunction;
  setOpen: any;
  name: string;
  setName: any;
}
