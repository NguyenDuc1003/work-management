import axios from "axios"
import { getToken } from "../services/authService"

const API_URL = "http://localhost:8080/api/boards" // sửa nếu backend port khác

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})

export const fetchBoards = () => axios.get(API_URL, getAuthHeader())
export const createBoard = (board) => axios.post(API_URL, board, getAuthHeader())
export const updateBoard = (id, board) => axios.put(`${API_URL}/${id}`, board, getAuthHeader())
export const deleteBoard = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeader())
