
import axios from "axios";
import { House } from "types";
import { NEXT_API_URL } from "./config";

const url = NEXT_API_URL + "/api/Homes";

// Define an Axios interceptor to handle errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    throw error;
  }
);

export const createHome = async (house: House) => {
  const response = await axios.post(url, house);
  return response.data;
};

export const getAllHomes = async () => {
  const response = await axios.get(url);
  console.log('Request URL:', response.config.url);
  return response.data
};

export const getHomes = async (city_id: number) => {
  const response = await axios.get(url+`/${city_id}`);
  console.log('Request URL:', response.config.url);
  return response.data
};

export const updateHome = async (house: House) => {
  const response = await axios.put(url+`/${house.home_id}`, house);
  return response.data;
};

export const deleteHome = async (home_id: number) => {
  const response = await axios.delete(url, { params: { home_id } });
  return response.data;
};

export default { getHomes,  deleteHome, updateHome, createHome, getAllHomes };
