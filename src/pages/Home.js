import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Welcome to BiteRoll</h1>
      {user ? (
        <p>
          Welcome back, <strong>{user.username}</strong>! Start discovering and
          saving your favorite restaurants.
        </p>
      ) : (
        <p>Discover and save your favorite restaurants!</p>
      )}
    </div>
  );
};

export default Home;
