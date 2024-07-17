import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.ID_produits}>
            <img
              src={`http://localhost:3001/images/${product.image}`}
              alt={product.Nom}
              style={{ width: "100px", height: "100px" }}
            />
            <Link to={`/product/${product.ID_produits}`}>{product.Nom}</Link>
            <button onClick={() => handleDelete(product.ID_produits)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
