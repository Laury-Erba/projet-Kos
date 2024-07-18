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
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#lorem">Lorem</a>
        </li>
        <li>
          <a href="#products">Products</a>
        </li>
        <li className="logo">
          <Link to="/">Kos'</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/cart" className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
