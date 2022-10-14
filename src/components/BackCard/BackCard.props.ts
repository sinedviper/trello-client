import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Board } from "../../interfaces";

export interface BackCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  board: Board;
}
