// Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/pages/_cart.scss";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Votre panier</h2>
      <ul className="cart-list">
        {cartItems.map((product) => (
          <li key={product.ID_produit} className="cart-item">
            <img
              src={`http://localhost:3001/images/${product.Image}`}
              alt={product.Nom}
              className="cart-item-image"
            />
            <Link
              to={`/product/${product.ID_produit}`}
              className="cart-item-name"
            >
              {product.Nom}
            </Link>
            <p className="cart-item-price">{product.Prix} €</p>
            <button
              onClick={() => removeFromCart(product.ID_produit)}
              className="cart-item-remove"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link to="/checkout">
        <button className="checkout-button">Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
