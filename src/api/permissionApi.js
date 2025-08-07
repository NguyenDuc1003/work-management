import axios from "axios"
import { getToken } from "../services/authService";

const API_BASE_URL = "http://localhost:8080/api/permissions"

export const getAllPermissions = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_BASE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    return response.data
  } catch (error) {
    console.error("❌ Lỗi getAllPermissions:", error)
    throw error
  }
}

export const getPermissionById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`)
  return response.data
}

export const createPermission = async (permission) => {
  const response = await axios.post(API_BASE_URL, permission)
  return response.data
}

export const updatePermission = async (id, permission) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, permission)
  return response.data
}

export const deletePermission = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`)
  return response.data
}
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})

export const assignPermissionsToRole = async (roleId, permissionIds) => {
  await axios.post(`${API_BASE_URL}/assign?roleId=${roleId}`, permissionIds, getAuthHeader())
}

export const removePermissionFromRole = async (roleId, permissionId) => {
  await axios.delete(`${API_BASE_URL}/remove?roleId=${roleId}&permissionId=${permissionId}`, getAuthHeader())
}
