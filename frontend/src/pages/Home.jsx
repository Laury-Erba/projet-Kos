import React from "react";
import ProductList from "../components/ProductList";
import HeaderHome from "../components/HeaderHome";
import About from "../components/About";
import Lorem from "../components/Lorem";
import "../styles/pages/_home.scss";

const Home = () => {
  return (
    <div className="home">
      <HeaderHome />
      <main>
        <About />
        <ProductList />
        <Lorem />
      </main>
    </div>
  );
};

export default Home;
