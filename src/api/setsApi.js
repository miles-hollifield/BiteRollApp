import axios from "axios";

const BASE_URL = "http://localhost:8000/sets";

export const getSets = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getSetEntries = async (setId) => {
  const response = await axios.get(`${BASE_URL}/${setId}/entries`);
  return response.data;
};
