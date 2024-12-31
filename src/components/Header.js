import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Use AuthContext to check login status
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          BiteRoll
        </Typography>
        {isAuthenticated ? (
          // Navigation for logged-in users
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/search">
              Search
            </Button>
            <Button color="inherit" component={Link} to="/favorites">
              Favorites
            </Button>
            <Button color="inherit" component={Link} to="/sets">
              Sets
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          // Navigation for guests
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
