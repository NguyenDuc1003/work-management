import axiosInstance from "./axiosInstance"
const BASE_URL = "/teams"
export const ApiGetAllTeams = () => axiosInstance.get(BASE_URL)
export const ApiCreateTeam = (teamDTO) => {
    console.log("🔍 teamApi - URL:", `${BASE_URL}`);
    console.log("🔍 teamApi - Data:", teamDTO);
    return axiosInstance.post(BASE_URL, teamDTO, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export const ApiUpdateTeam = (teamId, teamDTO) => axiosInstance.put(`${BASE_URL}/${teamId}`, teamDTO)
export const ApiDeleteTeam = (teamId) => axiosInstance.delete(`${BASE_URL}/${teamId}`)
export const ApiGetTeamById = (teamId) => axiosInstance.get(`${BASE_URL}/${teamId}`)
