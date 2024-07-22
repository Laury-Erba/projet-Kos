import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.ID_produit !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, user, setUser }}
    >
      {children}
    </CartContext.Provider>
  );
};
