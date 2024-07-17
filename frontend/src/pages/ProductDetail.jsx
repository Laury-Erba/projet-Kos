import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      console.log(response.data); // Ajoutez cette ligne pour vérifier la réponse
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleAddToCart = () => {
    // Logique pour ajouter le produit au panier
    console.log(`Product ${product.Nom} added to cart.`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.Nom}</h2>
      <img
        src={`http://localhost:3001/images/${product.image}`}
        alt={product.Nom}
        style={{ width: "200px", height: "200px" }}
      />
      <p>{product.Description}</p>
      <p>Price: {product.Prix} €</p>
      <p>Stock: {product.Stock}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
