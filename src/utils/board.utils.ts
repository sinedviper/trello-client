import axios from "axios";

import { api, links } from "../api";
import { Board } from "../interfaces";

export const getBoard = async (id: string): Promise<Board> => {
  const { data } = await axios.get(`${api}${links.board.get}${id}`);
  const { _id, name } = data;
  return { id: _id, name };
};
