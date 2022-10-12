import axios from "axios";

import { api, links } from "../api";
import { List } from "../interfaces";

export const getList = async (id: string): Promise<List[]> => {
  const { data } = await axios.get(`${api}${links.list.findAll}${id}`);
  return data.map((obj) => {
    const { _id, name, todosId, check } = obj;
    return { id: _id, name, todosId, check };
  });
};

export const removeList = async (id: string): Promise<void> => {
  await axios.delete(`${api}${links.list.delete}${id}`);
};

export const updateList = async (id: string, check: boolean): Promise<void> => {
  await axios.patch(`${api}${links.list.update}${id}`, { check });
};

export const createList = async (
  name: string,
  todosId: string,
  check: boolean = false
): Promise<void> => {
  await axios.post(`${api}${links.list.create}`, { name, todosId, check });
};
