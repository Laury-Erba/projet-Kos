import axios from "axios";

const API_URL = "http://localhost:3001/api/auth"; // Corriger le port ici si nécessaire

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/register", formData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Rejeter l'erreur pour que le composant puisse la gérer
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/login", formData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Rejeter l'erreur pour que le composant puisse la gérer
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
};
