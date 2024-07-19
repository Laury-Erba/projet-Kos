import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { CartContext } from "../context/CartContext";
import "../styles/pages/_login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Mot_de_passe: "",
  });
  const navigate = useNavigate();
  const { setUser } = useContext(CartContext);

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
      setUser(response.data); // Assuming you have a setUser method in your context
      alert("Connexion réussie");
      navigate("/"); // Redirect to home or dashboard
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Connexion</h2>
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
      <button className="form-button" type="submit">
        Se connecter
      </button>
    </form>
  );
};

export default Login;
