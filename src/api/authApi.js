import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getUserInfo = (username, token) => {
  return axios.get(`${API_URL}/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
