import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export const signup = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    username,
    password,
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};