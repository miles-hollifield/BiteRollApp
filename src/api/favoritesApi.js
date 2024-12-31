import axios from "axios";

const BASE_URL = "http://localhost:8000/favorites";

export const getFavorites = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addFavoriteToSet = async (favoriteId, setId) => {
  await axios.post(`${BASE_URL}/${favoriteId}/add-to-set`, { set_id: setId });
};
