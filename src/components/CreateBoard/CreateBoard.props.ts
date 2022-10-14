import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CreateBoardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open: boolean;
  setOpen: any;
  create: string;
  setCreate: any;
  handleCreate: VoidFunction;
}
