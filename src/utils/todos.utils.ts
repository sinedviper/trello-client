import { getList } from "./list.utils";
import axios from "axios";

import { api, links } from "../api";
import { Todos } from "../interfaces";

export const getTodos = async (id: string): Promise<Todos[]> => {
  const { data } = await axios.get(`${api}${links.todos.findAll}${id}`);
  return await Promise.all(
    data.map(async (obj) => {
      const { _id, name, boardId } = obj;
      const list = await getList(_id);
      return { id: _id, name, boardId, list };
    })
  );
};

export const removeTodos = async (id: string): Promise<void> => {
  await axios.delete(`${api}${links.todos.delete}${id}`);
};

export const createTodos = async (
  name: string,
  boardId: string
): Promise<void> => {
  await axios.post(`${api}${links.todos.create}`, { name, boardId });
};
