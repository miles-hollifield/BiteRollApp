import React, { useEffect, useState } from "react";
import { getSets, getSetEntries } from "../api/setsApi";
import SetCard from "../components/SetCard";
import {
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const Sets = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const data = await getSets();
        setSets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sets:", error);
      }
    };
    fetchSets();
  }, []);

  const handleViewSet = async (setId) => {
    try {
      const entries = await getSetEntries(setId);
      alert(`Restaurants in Set:\n${entries.map((entry) => entry.restaurant_name).join("\n")}`);
    } catch (error) {
      console.error("Error viewing set:", error);
      alert("Failed to view set.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Your Sets</Typography>
      <List>
        {sets.map((set) => (
          <ListItem key={set.set_id}>
            <SetCard set={set} onViewSet={() => handleViewSet(set.set_id)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sets;
