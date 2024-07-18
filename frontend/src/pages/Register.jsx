import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    Nom: "",
    Prenom: "",
    Email: "",
    Mot_de_passe: "",
    Adresse_de_livraison: "",
    role: "client", // Par défaut, rôle client
  });

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
        "http://localhost:3001/api/auth/register",
        formData
      );
      alert("Inscription réussie");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        placeholder="Prenom"
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
        name="Adresse_de_livraison"
        placeholder="Adresse de livraison"
        value={formData.Adresse_de_livraison}
        onChange={handleChange}
        required
      />
      <input type="hidden" name="role" value={formData.role} />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
