import axiosInstance from "../api/axiosInstance";
 const BASE_URL = "/departments";

export const ApiGetAllDepartment =() => axiosInstance.get(`${BASE_URL}`);
export const ApiCreateDepartment = (departmentDTO) => axiosInstance.post(`${BASE_URL}`, departmentDTO);
export const ApiUpdateDepartment = (departmentId, departmentDTO) => axiosInstance.put(`${BASE_URL}/${departmentId}`, departmentDTO);
export const ApiDeleteDepartment = (departmentId) => axiosInstance.delete(`${BASE_URL}/${departmentId}`);
export const ApiGetDepartmentById = (departmentId) => axiosInstance.get(`${BASE_URL}/${departmentId}`);