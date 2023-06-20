
import axios from "axios";
import { NEXT_API_URL } from "./config";
import { Region } from "types";
const url = NEXT_API_URL + "/api/Regions";

// Define an Axios interceptor to handle errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    throw error;
  }
);

export const createRegion = async (region: Region) => {
  const response = await axios.post(url, region);
  return response.data;
};

export const getRegions = async () => {
  const response = await axios.get(url);
  return response.data
};

export const updateRegion = async (region: Region) => {
  console.log('about to update regions')
  console.log(region)
  const response = await axios.put(url+`/${region.region_id}`, region);
  return response.data;
};

export const deleteRegion = async (region_id: number) => {
  
  const response = await axios.delete(url+`/${region_id}`);
  return response.data;
};

export default { getRegions,  createRegion, updateRegion, deleteRegion };
