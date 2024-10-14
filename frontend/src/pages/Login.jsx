import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; // Adaptez cette importation pour qu'elle fonctionne
import "../styles/pages/_login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Mot_de_passe: "",
    Role: "client", // Par défaut, rôle utilisateur
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData); // Ici `response` contient `data` et `user`
      console.log("Données utilisateur après connexion :", response);

      if (response && response.user && response.user.Role) {
        // Correction de l'accès à la structure des données
        if (response.user.Role === "admin") {
          navigate("/admin/dashboard"); // Redirige vers le dashboard admin pour les admins
        } else if (response.user.Role === "client") {
          navigate("/client/dashboard"); // Redirige vers le dashboard client pour les clients
        }
      } else {
        console.error("User or Role is undefined");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Connexion</h2>
      <input
        type="email"
        name="Email"
        placeholder="Email"
        value={formData.Email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="Mot_de_passe"
        placeholder="Mot de passe"
        value={formData.Mot_de_passe}
        onChange={handleChange}
        required
      />
      <select name="Role" onChange={handleChange} value={formData.Role}>
        <option value="client">Utilisateur</option>
        <option value="admin">Administrateur</option>
      </select>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
