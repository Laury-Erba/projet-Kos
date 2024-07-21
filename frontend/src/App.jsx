import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("your_stripe_public_key");

const App = () => {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
        </Elements>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
