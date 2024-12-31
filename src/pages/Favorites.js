import React, { useEffect, useState } from "react";
import { getFavorites, addFavoriteToSet } from "../api/favoritesApi";
import { getSets } from "../api/setsApi";
import FavoriteCard from "../components/FavoriteCard";
import {
  CircularProgress,
  List,
  ListItem,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState("");
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favData = await getFavorites();
        const setData = await getSets();
        setFavorites(favData);
        setSets(setData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddToSet = async (favoriteId) => {
    if (!selectedSet) {
      alert("Please select a set to add to.");
      return;
    }
    try {
      await addFavoriteToSet(favoriteId, selectedSet);
      alert("Favorite added to set!");
    } catch (error) {
      console.error("Error adding favorite to set:", error);
      alert("Failed to add to set.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Your Favorites</Typography>
      <Select
        value={selectedSet}
        onChange={(e) => setSelectedSet(e.target.value)}
        displayEmpty
        style={{ marginBottom: "20px", width: "100%" }}
      >
        <MenuItem value="" disabled>
          Select a Set
        </MenuItem>
        {sets.map((set) => (
          <MenuItem key={set.set_id} value={set.set_id}>
            {set.set_name}
          </MenuItem>
        ))}
      </Select>
      <List>
        {favorites.map((favorite) => (
          <ListItem key={favorite.favorite_id}>
            <FavoriteCard
              favorite={favorite}
              onAddToSet={() => handleAddToSet(favorite.favorite_id)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Favorites;
