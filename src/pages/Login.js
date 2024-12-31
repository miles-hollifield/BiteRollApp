import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = "dummy-token"; // Replace with real API response token
      login(token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.detail || error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Container>
  );
};

export default Login;
