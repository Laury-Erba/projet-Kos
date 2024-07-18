import React from "react";
import ProductList from "../components/ProductList";
import HeaderHome from "../components/HeaderHome";
import About from "../components/About";
import Lorem from "../components/Lorem";

const Home = () => {
  return (
    <div>
      <HeaderHome />
      <main>
        <ProductList />
        <About />
        <Lorem />
      </main>
    </div>
  );
};

export default Home;
