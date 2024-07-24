// CheckoutForm.jsx
import React, { useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/pages/_checkoutForm.scss";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:3001/create-checkout-session",
          {
            items: cart,
            id,
          }
        );

        const { client_secret } = response.data;

        const result = await stripe.confirmCardPayment(client_secret);

        if (result.error) {
          console.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            console.log("Payment successful");
            navigate("/success"); // Redirect to a success page
          }
        }
      } catch (error) {
        console.error("Error processing payment: ", error);
      }
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Payment</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-element">Credit or debit card</label>
          <CardElement id="card-element" className="card-element" />
        </div>
        <button className="checkout-button" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
