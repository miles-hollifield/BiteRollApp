import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const FavoriteCard = ({ favorite, onAddToSet }) => (
  <Card style={{ width: "100%" }}>
    <CardContent>
      <Typography variant="h6">{favorite.restaurant_name}</Typography>
      <Typography variant="body2">{favorite.restaurant_cuisine}</Typography>
      <Button variant="contained" color="primary" onClick={onAddToSet}>
        Add to Set
      </Button>
    </CardContent>
  </Card>
);

export default FavoriteCard;
