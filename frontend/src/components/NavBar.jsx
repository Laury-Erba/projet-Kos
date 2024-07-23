import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import "../styles/components/_navbar.scss";

const NavBar = () => {
  const { user, setUser, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Kos'
        </Link>
        <div className="navbar-links">
          <a href="#about">About</a>
          <Link to="/cart" className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">{cartItems.length}</span>
          </Link>
          {user ? (
            <>
              {user.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} /> Connexion
              </Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
