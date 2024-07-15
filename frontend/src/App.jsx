import React from "react";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Application E-commerce</h1>
      </header>
      <main>
        <routes>
          <Route path="/" element={<Products />} />
        </routes>
        <ProductList />
      </main>
      <footer>
        <p>&copy; 2024 Mon Application E-commerce</p>
      </footer>
    </div>
  );
};

export default App;
