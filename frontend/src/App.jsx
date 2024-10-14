import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Cart from "./pages/Cart";
import CheckoutForm from "./components/CheckoutForm";
import { CartProvider } from "./context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

const App = () => {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
