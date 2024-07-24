import axios from "axios";

const API_URL = "http://localhost:3001/api/produits";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

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
    return await axiosInstance.post("/", product, {
      ...getAuthHeaders(),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    return await axiosInstance.put(`/${id}`, product, {
      ...getAuthHeaders(),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    return await axiosInstance.delete(`/${id}`, getAuthHeaders());
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
