// src/api/taskApi.js
import axios from "axios"
import { getToken } from "../services/authService"

const API_URL = "http://localhost:8080/api/tasks"

const getAuthHeader = () => {
  const token = getToken()
  console.log('🔑 Token in taskApi:', token)
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }
}

export const createTask = (taskDTO) => {
  console.log('📝 Creating task:', taskDTO)
  return axios.post(API_URL, taskDTO, getAuthHeader())
}

export const updateTask = (id, taskDTO) => {
  console.log('✏️ Updating task:', id, taskDTO)
  console.log('🔑 Auth header:', getAuthHeader())
  return axios.put(`${API_URL}/${id}`, taskDTO, getAuthHeader())
}

export const deleteTask = (id) => {
  console.log('🗑️ Deleting task:', id)
  return axios.delete(`${API_URL}/${id}`, getAuthHeader())
}

export const getTasksByGroup = (groupId) => {
  console.log('📋 Getting tasks for group:', groupId)
  return axios.get(`${API_URL}/group/${groupId}`, getAuthHeader())
}

// Thêm các API khác nếu cần
export const getAllTasks = () => 
  axios.get(API_URL, getAuthHeader())

export const getTaskById = (id) => 
  axios.get(`${API_URL}/${id}`, getAuthHeader())