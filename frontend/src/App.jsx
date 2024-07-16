import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Application E-commerce</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Mon Application E-commerce</p>
      </footer>
    </div>
  );
};

export default App;
