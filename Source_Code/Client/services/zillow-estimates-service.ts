import axios from "axios";
import { ZillowEstimate } from "types";
import { NEXT_API_URL } from "./config";

const url = NEXT_API_URL + "/api/Zillow-Estimates";

// Define an Axios interceptor to handle errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    throw error;
  }
);

const getZillowEstimates = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createZillowEstimate = async (zillowEstimate: Partial<ZillowEstimate>) => {
  const response = await axios.post(url, zillowEstimate);
  return response.data;
};

const updateZillowEstimate = async (zillowEstimate: Partial<ZillowEstimate>) => {
  const zillow_price_id = zillowEstimate.zillow_price_id;
  const response = await axios.put(`${url}/${zillow_price_id}`, zillowEstimate);
  return response.data;
};

const deleteZillowEstimate = async (zillow_price_id: number) => {
  const response = await axios.delete(`${url}/${zillow_price_id}`);
  return response.data;
};

export default { getZillowEstimates, createZillowEstimate, updateZillowEstimate, deleteZillowEstimate };