import React, { useState } from "react";

const LoginClientForm = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Mot_de_passe: motDePasse }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la connexion.");
      }

      const data = await response.json();
      alert("Connexion réussie!");
      localStorage.setItem("token", data.token); // Sauvegarde du token dans localStorage
    } catch (error) {
      console.error("Erreur lors de la connexion:", error.message);
      // Gérer l'affichage d'un message d'erreur à l'utilisateur si nécessaire
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Mot de passe:
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
      </label>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginClientForm;
