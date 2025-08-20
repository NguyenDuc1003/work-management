
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
  getAllUsers
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

export const getAllUser = async() =>{
  try{
    const response = await getAllUsers();
    return response.data;
  }catch(error){
    console.error("Failed to fetch all users:", error);
    throw error;
  }
}
export const getUserName = async (userName) =>{
  try{
    const response = await getUserInfo(userName);
    return response.data;
  }
  catch{
    return null;
  }
}