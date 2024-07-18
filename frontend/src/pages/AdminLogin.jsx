import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    Nom_utilisateur: "",
    Mot_de_passe: "",
    role: "admin", // Par défaut, rôle admin
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
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );
      alert("Connexion admin réussie");
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } catch (error) {
      console.error("Erreur lors de la connexion admin :", error);
      alert("Erreur lors de la connexion admin");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion Admin</h2>
      <input
        type="text"
        name="Nom_utilisateur"
        placeholder="Nom utilisateur"
        value={formData.Nom_utilisateur}
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
      <input type="hidden" name="role" value={formData.role} />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default AdminLogin;
