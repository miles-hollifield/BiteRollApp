import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { fetchData } from "./api";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData().then((response) => setData(response.data));
  }, []);

  return (
    <Container>
      <Typography variant="h3">BiteRoll</Typography>
      <Typography variant="body1">{data}</Typography>
      <Button variant="contained" color="primary">
        Explore
      </Button>
    </Container>
  );
}

export default App;
