import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Your backend URL

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/users/login`, credentials);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
