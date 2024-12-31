import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/users/register", formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.detail || error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="First Name"
          name="firstname"
          variant="outlined"
          value={formData.firstname}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastname"
          variant="outlined"
          value={formData.lastname}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          value={formData.username}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
