import React, { useState } from "react";
import { searchRestaurants } from "../api/yelpApi";
import { addFavorite } from "../api/favoritesApi"; // API function for adding favorites
import {
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [addingFavorite, setAddingFavorite] = useState(null); // To handle favorite button state

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const data = await searchRestaurants(
              searchTerm,
              position.coords.latitude,
              position.coords.longitude
            );
            setResults(data);
            setLoading(false);
          },
          async () => {
            const data = await searchRestaurants(searchTerm);
            setResults(data);
            setLoading(false);
          }
        );
      } else {
        const data = await searchRestaurants(searchTerm);
        setResults(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during search:", error);
      alert("Error fetching restaurants. Please try again.");
      setLoading(false);
    }
  };

  const handleAddFavorite = async (restaurant) => {
    setAddingFavorite(restaurant.id); // Indicate which restaurant is being added
    try {
      const payload = { restaurant_id: restaurant.id }; // Payload for the backend
      console.log("Payload being sent:", payload); // Debug payload
      const response = await addFavorite(payload);
      console.log("Favorite added successfully:", response); // Debug backend response
      alert(`${restaurant.name} has been added to your favorites!`);
    } catch (error) {
      console.error("Error adding favorite:", error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Log backend response
        console.error("Response status:", error.response.status); // Log response status
      }
      alert("Failed to add favorite. Please try again.");
    } finally {
      setAddingFavorite(null); // Reset the state
    }
  };
  
  
  
  

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        label="Search Restaurants"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={!searchTerm || loading}
      >
        {loading ? <CircularProgress size={24} /> : "Search"}
      </Button>
      <List>
        {results.map((result, index) => (
          <ListItem key={result.id || `${result.name}-${index}`} alignItems="flex-start">
            <ListItemText
              primary={result.name}
              secondary={`${result.address || "Address not available"} - ${
                result.categories?.join(", ") || "No categories"
              }`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                color="primary"
                onClick={() => handleAddFavorite(result)}
                disabled={addingFavorite === result.id}
              >
                <Favorite />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Search;
