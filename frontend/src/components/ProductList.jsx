import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/produits");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits : ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.ID_produit} className="product-card">
          <img src={`/public/images/${product.image}`} alt={product.Nom} />
          <h3>{product.Nom}</h3>
          <p>{product.Description}</p>
          <p>Prix : {product.Prix} €</p>
          <p>Stock : {product.Stock} unités</p>
          <button>Voir détails</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
