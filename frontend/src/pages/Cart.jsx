import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  if (cart.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Votre panier</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.ID_produit}>
            <img
              src={`http://localhost:3001/images/${product.image}`}
              alt={product.Nom}
              style={{ width: "100px", height: "100px" }}
            />
            <Link to={`/product/${product.ID_produit}`}>{product.Nom}</Link>
            <p>{product.Prix} €</p>
            <button onClick={() => removeFromCart(product.ID_produit)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
