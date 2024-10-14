import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/pages/_register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    Nom: "",
    Prenom: "",
    Email: "",
    Mot_de_passe: "",
    Adresse: "",
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
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Inscription</h2>
      <input
        type="text"
        name="Nom"
        placeholder="Nom"
        value={formData.Nom}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Prenom"
        placeholder="Prénom"
        value={formData.Prenom}
        onChange={handleChange}
        required
      />
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
      <input
        type="text"
        name="Adresse"
        placeholder="Adresse"
        value={formData.Adresse}
        onChange={handleChange}
        required
      />
      <select name="Role" onChange={handleChange} value={formData.Role}>
        <option value="client">Utilisateur</option>
        <option value="admin">Administrateur</option>
      </select>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
