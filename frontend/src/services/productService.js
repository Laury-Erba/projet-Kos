import axios from "axios";

const API_URL = "/api/produits";

export const getProducts = async () => {
  return await axios.get(API_URL);
};

export const addProduct = async (product) => {
  return await axios.post(API_URL, product);
};

export const updateProduct = async (id, product) => {
  return await axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
