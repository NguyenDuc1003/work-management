import axios from "axios"
import { getToken } from "../services/authService"

const API_URL = "http://localhost:8080/api/users"

export const registerUser = (data) => axios.post(`${API_URL}/register`, data)
export const loginUser = (data) => axios.post(`${API_URL}/login`, data)

export const getUserInfo = (userName) =>
  axios.get(`${API_URL}/${userName}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })

export const updateUser = (id, data, avatarFile) => {
  const formData = new FormData()
  formData.append("user", new Blob([JSON.stringify(data)], { type: "application/json" }))
  if (avatarFile) formData.append("avatar", avatarFile)

  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const getAllUsers = () =>
  axios.get(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })

export const assignRoleToUser = (userId, roleId) =>
  axios.post(`${API_URL}/${userId}/roles/${roleId}`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })

export const removeRoleFromUser = (userId, roleId) =>
  axios.delete(`${API_URL}/${userId}/roles/${roleId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
