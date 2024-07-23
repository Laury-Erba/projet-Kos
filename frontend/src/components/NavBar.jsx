// NavBar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <Link to="/cart" className="cart-icon">
            <span className="cart-count">{cartItems.length}</span>
          </Link>
          {user ? (
            <>
              {user.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
