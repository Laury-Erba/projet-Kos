import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      console.log("API response:", response.data);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Unexpected API response:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
  }

  return (
    <div id="products">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.ID_produit}>
            <img
              src={`http://localhost:3001/images/${product.image}`}
              alt={product.Nom}
              style={{ width: "100px", height: "100px" }}
            />
            <Link to={`/product/${product.ID_produit}`}>{product.Nom}</Link>
            <button onClick={() => handleDelete(product.ID_produit)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
