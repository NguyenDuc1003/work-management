import axios from "axios"
import { getToken } from "../services/authService"

const BASE_URL = "http://localhost:8080/api/groups"

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})

export const getGroupsByBoard = (boardId) => axios.get(`${BASE_URL}/board/${boardId}`, getAuthHeader())
export const createGroup = (groupDTO) => axios.post(BASE_URL, groupDTO, getAuthHeader())
export const updateGroup = (groupId, groupDTO) => axios.put(`${BASE_URL}/${groupId}`, groupDTO, getAuthHeader())
export const deleteGroup = (groupId) => axios.delete(`${BASE_URL}/${groupId}`, getAuthHeader())
export const fetchGroupById = (id) => axios.get(`${BASE_URL}/${id}`, getAuthHeader())
