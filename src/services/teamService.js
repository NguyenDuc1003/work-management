import * as teamApi from "../api/teamApi";

export const getAllTeams = async()=>{
    const response = await teamApi.ApiGetAllTeams();
    return response.data;
}
export const createTeam = async (teamDTO) => {
    try {
        console.log("🔍 teamService - Dữ liệu gửi lên API:", teamDTO);
        const response = await teamApi.ApiCreateTeam(teamDTO);
        console.log("✅ teamService - Response từ API:", response);
        return response.data;
    } catch (error) {
        console.error("❌ teamService - Lỗi khi tạo team:", error);
        console.error("❌ teamService - Response data:", error.response?.data);
        throw error;
    }
}

export const updateTeams = async(teamId , teamDTO) =>{
    const response = await teamApi.ApiUpdateTeam(teamId, teamDTO)
    return response.data;
}

export const deleteTeams = async(teamId) =>{
    const response = await teamApi.ApiDeleteTeam(teamId)
    return response.data;
}

export const getTeamById = async(teamId)=>{
    const response = await teamApi.ApiGetTeamById(teamId)
    return response.data;
}

