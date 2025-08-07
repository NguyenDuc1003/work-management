import axios from "axios"

const BASE_URL = "http://localhost:8080/api/modules"

export const getAllModules = () => axios.get(BASE_URL)
export const createModule = (data) => axios.post(BASE_URL, data)
export const updateModule = (id, data) => axios.put(`${BASE_URL}/${id}`, data)
export const deleteModule = (id) => axios.delete(`${BASE_URL}/${id}`)
