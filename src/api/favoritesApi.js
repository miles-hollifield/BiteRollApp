import axios from "axios";

const BASE_URL = "http://localhost:8000/favorites";

// Fetch the favorites for the logged-in user
export const getFavorites = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("User is not authenticated");

  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add a restaurant to the favorites
export const addFavorite = async (favoriteData) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("User is not authenticated");

  console.log("Payload sent to backend:", favoriteData); // Debug the payload

  try {
    const response = await axios.post(BASE_URL, favoriteData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Ensure JSON content type
      },
    });
    console.log("Response from backend:", response.data); // Debug response
    return response.data;
  } catch (error) {
    console.error("Error in addFavorite:", error);
    if (error.response) {
      console.error("Response data:", error.response.data); // Debug backend response data
      console.error("Response status:", error.response.status); // Debug response status
    }
    throw error; // Re-throw to handle on the caller side
  }
};





// Remove a restaurant from the favorites
export const deleteFavorite = async (favoriteId) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("User is not authenticated");

  await axios.delete(`${BASE_URL}/${favoriteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add a favorite to a set
export const addFavoriteToSet = async (favoriteId, setId) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("User is not authenticated");

  await axios.post(
    `${BASE_URL}/${favoriteId}/add-to-set`,
    { set_id: setId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
