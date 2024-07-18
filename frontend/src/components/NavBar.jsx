import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";

const NavBar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#lorem">Lorem</a>
        </li>
        <li>
          <a href="#products">Products</a>
        </li>
      </ul>
      <Link to="/cart" className="cart-icon">
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </Link>
    </nav>
  );
};

export default NavBar;
