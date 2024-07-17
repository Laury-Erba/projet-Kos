import React, { useState } from "react";
import { addProduct, updateProduct } from "../services/productService";

const ProductForm = ({ fetchProducts }) => {
  const [product, setProduct] = useState({
    Nom: "",
    Description: "",
    Prix: "",
    Stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.ID_produits) {
      await updateProduct(product.ID_produits, product);
    } else {
      await addProduct(product);
    }
    fetchProducts();
    setProduct({ Nom: "", Description: "", Prix: "", Stock: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="Nom"
        value={product.Nom}
        onChange={handleChange}
        placeholder="Nom"
        required
      />
      <input
        name="Description"
        value={product.Description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="Prix"
        value={product.Prix}
        onChange={handleChange}
        placeholder="Prix"
        required
      />
      <input
        name="Stock"
        value={product.Stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />
      <input
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
