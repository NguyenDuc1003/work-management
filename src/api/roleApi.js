// src/api/roleApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/roles';

export const getAllRoles = () => {
  return axios.get(API_URL); // GET /api/roles
};

export const getRoleById = (id) => {
  return axios.get(`${API_URL}/${id}`); // GET /api/roles/:id
};

export const createRole = (role) => {
  return axios.post(API_URL, role); // POST /api/roles
};

export const updateRole = (id, role) => {
  return axios.put(`${API_URL}/${id}`, role); // PUT /api/roles/:id
};

export const deleteRole = (id) => {
  return axios.delete(`${API_URL}/${id}`); // DELETE /api/roles/:id
};

export const assignRoleToUser = (userId, roleId) => {
  return axios.post(`${API_URL}/assign`, null, {
    params: { userId, roleId }
  });
};

export const removeRoleFromUser = (userId, roleId) => {
  return axios.delete(`${API_URL}/remove`, {
    params: { userId, roleId }
  });
};
