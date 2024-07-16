import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    Nom: "",
    Description: "",
    Prix: "",
    Stock: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/produits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit");
      }
      const data = await response.json();
      alert("Produit ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit : ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Nom"
        placeholder="Nom"
        onChange={handleChange}
        required
      />
      <textarea
        name="Description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="Prix"
        placeholder="Prix"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="Stock"
        placeholder="Stock"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddProduct;
