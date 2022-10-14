import { DetailedHTMLProps, HTMLAttributes } from "react";

import { Board } from "../../interfaces";

export interface BoardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  board: Board;
  handleRemove: Function;
}
