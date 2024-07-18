import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
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
      <p>Prix: {product.Prix} €</p>
      <p>Stock: {product.Stock}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
