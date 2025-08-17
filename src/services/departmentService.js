import * as departmentApi from "../api/departmentApi.js";

export const getAllDepartments = async () => {
  try {
    const response = await departmentApi.ApiGetAllDepartment();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDepartment = async (departmentDTO) => {
  try {
    const response = await departmentApi.ApiCreateDepartment(departmentDTO);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateDepartment = async(departmentId, departmentDTO)=>{
    try{
        const response = await departmentApi.ApiUpdateDepartment(departmentId, departmentDTO)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDepartment = async(departmentId) => {
    try{
        const response = await departmentApi.ApiDeleteDepartment(departmentId)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDepartmentById = async (departmentId) => {
    try {
        const response = await departmentApi.ApiGetDepartmentById(departmentId);
        return response.data;
    } catch (error) {
        throw error;
    }
};
