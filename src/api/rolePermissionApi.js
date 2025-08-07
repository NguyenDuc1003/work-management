import axios from "axios";
import { getToken } from "../services/authService";

const API_URL = "http://localhost:8080/api/role-permissions";

export const fetchRolePermissions = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Mảng RolePermissionDTO
  } catch (error) {
    console.error("Lỗi khi lấy rolePermissions:", error);
    throw error;
  }
};
