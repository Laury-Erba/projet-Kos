import axios from "axios";

const API_URL = "http://localhost:3001/api/produits"; // Assurez-vous d'utiliser l'URL complète avec le port si nécessaire

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  try {
    return await axiosInstance.get("/");
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (id) => {
  try {
    return await axiosInstance.get(`/${id}`);
  } catch (error) {
    handleError(error);
  }
};

export const addProduct = async (product) => {
  try {
    return await axiosInstance.post("/", product);
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    return await axiosInstance.put(`/${id}`, product);
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    return await axiosInstance.delete(`/${id}`);
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
};
