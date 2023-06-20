import axios from "axios";
import { State } from "types";
import { NEXT_API_URL } from "./config";

const url = NEXT_API_URL + "/api/States";

// Define an Axios interceptor to handle errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    throw error;
  }
);

const getStates = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createState = async (state: State) => {
  const response = await axios.post(url, state);
  return response.data;
};

const updateState = async (state: State) => {
  const response = await axios.put(`${url}/${state.state_id}`, state);
  return response.data;
};

const deleteState = async (stateId: number) => {
  const response = await axios.delete(`${url}/${stateId}`);
  return response.data;
};

export default { getStates, createState, updateState, deleteState };
