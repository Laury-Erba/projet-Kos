import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/components/_navbar.scss";

const NavBar = () => {
  const { user, setUser } = useContext(CartContext);
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
          My E-Commerce
        </Link>
        <div className="navbar-links">
          <Link to="/cart">Cart</Link>
          {user ? (
            <>
              {user.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
              <Link to="/account">Mon Compte</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
