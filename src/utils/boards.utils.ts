import axios from "axios";

import { api, links } from "../api";
import { Board } from "../interfaces";

export const getBoards = async (): Promise<Board[]> => {
  const { data } = await axios.get(`${api}${links.boards.findAll}`);
  return data.map((obj) => {
    const { _id, name } = obj;
    return { id: _id, name };
  });
};

export const removeBoards = async (id: string): Promise<void> => {
  await axios.delete(`${api}${links.boards.delete}${id}`);
};

export const createBoards = async (name: string): Promise<void> => {
  await axios.post(`${api}${links.boards.create}`, { name });
};
