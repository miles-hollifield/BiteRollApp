import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const SetCard = ({ set, onViewSet }) => (
  <Card style={{ width: "100%" }}>
    <CardContent>
      <Typography variant="h6">{set.set_name}</Typography>
      <Button variant="contained" color="secondary" onClick={onViewSet}>
        View Set
      </Button>
    </CardContent>
  </Card>
);

export default SetCard;
