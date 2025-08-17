import * as companyApi from "../api/companyApi";

export const getAllCompanies = async () => {
    try {
        const response = await companyApi.ApigetAllCompany();
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCompaniesById = async (companyId) => {
    try {
        const response = await companyApi.ApiGetCompanyById(companyId);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCompany = async (companyDTO) => {
    try {
        const response = await companyApi.ApiCreateCompany(companyDTO);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCompay = async (companyId, companyDTO) =>{
    try{
        const response = await companyApi.ApiUpdateCompany(companyId,companyDTO);
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const deleteCompany = async (companyId) => {
    try {
        const response = await companyApi.ApiDeleteCompany(companyId);
        return response.data;
    } catch (error) {
        throw error;
    }
}