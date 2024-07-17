import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import ProductForm from "../components/ProductForm";

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
      <h1>Product List</h1>
      <ProductForm fetchProducts={fetchProducts} />
      <ul>
        {products.map((product) => (
          <li key={product.ID_produits}>
            {product.Nom} - {product.Prix}
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
