import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser
} from "../api/userApi";

export const UserService = {
  register: async (data) => {
    const response = await registerUser(data);
    return response.data;
  },

  login: async (userData) => {
  try {
    const response = await loginUser(userData);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
},

  getInfo: async (userName) => {
    const response = await getUserInfo(userName);
    return response.data;
  },

  update: async (id, userDTO, avatar) => {
    const response = await updateUser(id, userDTO, avatar);
    return response.data;
  },
};
