import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
