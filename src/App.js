import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Assuming you have a Login component
import Register from "./pages/Register"; // Assuming you have a Register component
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Sets from "./pages/Sets";
import PrivateRoute from "./components/PrivateRoute"; // For authenticated routes

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protect these routes with authentication */}
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/sets"
          element={
            <PrivateRoute>
              <Sets />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
