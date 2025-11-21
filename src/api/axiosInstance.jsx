import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://crm-app-backend-plum.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
