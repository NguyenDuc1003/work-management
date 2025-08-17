//Viết một lần dùng ở tất cả các file api và ko cần get authention header nữa dùng sẽ rất gọn
import axios from "axios";
import { getToken } from "../services/authService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});
axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;
//trong này đã có luôn axios rồi nên chỉ cần import axiosInstance là dùng được