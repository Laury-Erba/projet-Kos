import React, { useState } from "react";

const InscriptionForm = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [adresseDeLivraison, setAdresseDeLivraison] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom: nom,
          Prenom: prenom,
          Email: email,
          Mot_de_passe: motDePasse,
          Adresse_de_livraison: adresseDeLivraison,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription.");
      }

      alert("Inscription réussie!");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.message);
      // Gérer l'affichage d'un message d'erreur à l'utilisateur si nécessaire
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </label>
      <label>
        Prénom:
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
      </label>
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
      <label>
        Adresse de livraison:
        <input
          type="text"
          value={adresseDeLivraison}
          onChange={(e) => setAdresseDeLivraison(e.target.value)}
          required
        />
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default InscriptionForm;
