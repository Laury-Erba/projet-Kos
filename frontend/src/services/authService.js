import axios from "axios";

const API_URL = "http://localhost:3001/api/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour enregistrer un utilisateur
export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/register", formData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/login", formData);

    console.log("Login response:", response); // Log complet de la réponse

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Stocker le token

      if (response.data.user && response.data.user.Role) {
        localStorage.setItem("Role", response.data.user.Role); // Stocker le rôle de l'utilisateur
      } else {
        console.error("Role is undefined in the response", response.data); // Ajoute des logs plus détaillés ici
      }
    }
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    handleError(error);
  }
};

// Gérer les erreurs
const handleError = (error) => {
  let errorMessage = "Une erreur inconnue s'est produite.";

  if (error.response) {
    console.error("Server responded with a status:", error.response.status);
    console.error("Data:", error.response.data);
    errorMessage = error.response.data.message || errorMessage; // Utilisez un message d'erreur du backend s'il est disponible
  } else if (error.request) {
    console.error("Request was made but no response received:", error.request);
  } else {
    console.error("Error in setting up request:", error.message);
  }
  console.error("Config:", error.config);

  // Renvoi d'une erreur personnalisée
  throw new Error(errorMessage);
};
