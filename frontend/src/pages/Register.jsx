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
    Adresse_de_livraison: "",
    role: "client", // Par défaut, rôle client
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
      const response = await registerUser(formData);
      console.log("Register response:", response); // Ajoutez cette ligne
      alert("Inscription réussie");
      navigate("/login"); // Rediriger vers la page de connexion
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Inscription</h2>
      <input
        className="form-input"
        type="text"
        name="Nom"
        placeholder="Nom"
        value={formData.Nom}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        type="text"
        name="Prenom"
        placeholder="Prenom"
        value={formData.Prenom}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        type="email"
        name="Email"
        placeholder="Email"
        value={formData.Email}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        type="password"
        name="Mot_de_passe"
        placeholder="Mot de passe"
        value={formData.Mot_de_passe}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        type="text"
        name="Adresse_de_livraison"
        placeholder="Adresse de livraison"
        value={formData.Adresse_de_livraison}
        onChange={handleChange}
        required
      />
      <input type="hidden" name="role" value={formData.role} />
      <button className="form-button" type="submit">
        S'inscrire
      </button>
    </form>
  );
};

export default Register;
