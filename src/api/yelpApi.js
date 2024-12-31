import axios from "axios";

const BASE_URL = "http://localhost:8000/yelp";

export const searchRestaurants = async (name, lat = null, lon = null) => {
  try {
    const params = { name };
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    const response = await axios.get(`${BASE_URL}/restaurants/search`, { params });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    throw error;
  }
};
