import React from "react";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <header className="header-home">
      <img
        src="/public/images/header-home.webp"
        alt="Header image collection KOS"
        className="header-image"
      />
      <h1>Découvrez notre nouvelle collection Kos'</h1>
      <Link to="/shop">
        <button className="shop-button">Shop Now</button>
      </Link>
    </header>
  );
};

export default HeaderHome;
