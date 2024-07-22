import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Mot_de_passe: "",
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
      const response = await loginUser(formData);
      alert("Connexion réussie");

      // Redirigez en fonction du rôle
      if (response.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
