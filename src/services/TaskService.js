// Service để tương tác với backend API
import axios from "axios"

const API_BASE_URL = "http://localhost:8080/api"

export const TaskService = {
  // Workspace APIs
  getWorkspaces: async () => {
    const response = await axios.get(`${API_BASE_URL}/workspaces`)
    return response.data
  },

  createWorkspace: async (workspaceData) => {
    const response = await axios.post(`${API_BASE_URL}/workspaces`, workspaceData)
    return response.data
  },

  updateWorkspace: async (workspaceId, workspaceData) => {
    const response = await axios.put(`${API_BASE_URL}/workspaces/${workspaceId}`, workspaceData)
    return response.data
  },

  deleteWorkspace: async (workspaceId) => {
    const response = await axios.delete(`${API_BASE_URL}/workspaces/${workspaceId}`)
    return response.data
  },

  // Board APIs
  getBoards: async (workspaceId) => {
    const response = await axios.get(`${API_BASE_URL}/workspaces/${workspaceId}/boards`)
    return response.data
  },

  createBoard: async (workspaceId, boardData) => {
    const response = await axios.post(`${API_BASE_URL}/workspaces/${workspaceId}/boards`, boardData)
    return response.data
  },

  updateBoard: async (boardId, boardData) => {
    const response = await axios.put(`${API_BASE_URL}/boards/${boardId}`, boardData)
    return response.data
  },

  deleteBoard: async (boardId) => {
    const response = await axios.delete(`${API_BASE_URL}/boards/${boardId}`)
    return response.data
  },

  // Group APIs
  getGroups: async (boardId) => {
    const response = await axios.get(`${API_BASE_URL}/boards/${boardId}/groups`)
    return response.data
  },

  createGroup: async (boardId, groupData) => {
    const response = await axios.post(`${API_BASE_URL}/boards/${boardId}/groups`, groupData)
    return response.data
  },

  updateGroup: async (groupId, groupData) => {
    const response = await axios.put(`${API_BASE_URL}/groups/${groupId}`, groupData)
    return response.data
  },

  deleteGroup: async (groupId) => {
    const response = await axios.delete(`${API_BASE_URL}/groups/${groupId}`)
    return response.data
  },

  // Task APIs
  getTasks: async (groupId) => {
    const response = await axios.get(`${API_BASE_URL}/groups/${groupId}/tasks`)
    return response.data
  },

  createTask: async (groupId, taskData) => {
    const response = await axios.post(`${API_BASE_URL}/groups/${groupId}/tasks`, taskData)
    return response.data
  },

  updateTask: async (taskId, taskData) => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData)
    return response.data
  },

  deleteTask: async (taskId) => {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`)
    return response.data
  },

  // Search API
  searchTasks: async (query, boardId) => {
    const response = await axios.get(`${API_BASE_URL}/boards/${boardId}/search?q=${query}`)
    return response.data
  },

  // Statistics API
  getTaskStatistics: async (boardId) => {
    const response = await axios.get(`${API_BASE_URL}/boards/${boardId}/statistics`)
    return response.data
  },
}
