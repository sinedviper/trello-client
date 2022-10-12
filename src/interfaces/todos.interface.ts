import { List } from "./list.interface";

export interface Todos {
  id: string;
  name: string;
  list: List[];
  boardId: string;
}
