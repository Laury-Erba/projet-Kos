import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  try {
    return await axiosInstance.post("/register", userData);
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (userData) => {
  try {
    return await axiosInstance.post("/login", userData);
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error("Server responded with a status:", error.response.status);
    console.error("Data:", error.response.data);
  } else if (error.request) {
    console.error("Request was made but no response received:", error.request);
  } else {
    console.error("Error in setting up request:", error.message);
  }
  console.error("Config:", error.config);
  throw error; // Rejeter l'erreur pour la propager au niveau supérieur
};
