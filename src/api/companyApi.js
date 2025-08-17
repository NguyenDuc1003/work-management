import axiosInstance from "./axiosInstance"
const BASE_URL = "/companies"

export const ApigetAllCompany = () => axiosInstance.get(`${BASE_URL}`)
export const ApigetCompanyById = (companyId) => axiosInstance.get(`${BASE_URL}/${companyId}`)
export const ApicreateCompany = (companyDTO) => axiosInstance.post(`${BASE_URL}`, companyDTO)
export const ApiupdateCompany = (companyId, companyDTO) => axiosInstance.put(`${BASE_URL}/${companyId}`, companyDTO)
export const ApideleteCompany = (companyId) => axiosInstance.delete(`${BASE_URL}/${companyId}`)