import React, { useState } from "react";
import { searchRestaurants } from "../api/yelpApi";
import {
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

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
      setLoading(false);
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
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={result.name}
              secondary={`${result.address} - ${result.categories.join(", ")}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Search;
