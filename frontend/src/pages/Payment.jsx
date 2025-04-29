import { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import { loadStripe } from "@stripe/stripe-js";  
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";  
import "./Payment.css";  

// Stripe public key (replace with yours)  
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");  

const PaymentForm = () => {  
  const stripe = useStripe();  
  const elements = useElements();  
  const [error, setError] = useState(null);  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    if (!stripe || !elements) return;  

    // Create payment method  
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({  
      type: "card",  
      card: elements.getElement(CardElement),  
    });  

    if (stripeError) {  
      setError(stripeError.message);  
      return;  
    }  

    // Send payment details to backend  
    try {  
      const res = await fetch("/api/payments", {  
        method: "POST",  
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify({ paymentMethod: paymentMethod.id }),  
      });  

      if (res.ok) {  
        navigate("/success"); // Redirect to confirmation page  
      } else {  
        setError("Payment failed. Please try again.");  
      }  
    } catch (err) {  
      setError("Network error. Check your connection.");  
    }  
  };  

  return (  
    <form onSubmit={handleSubmit} className="payment-form">  
      <h2>Payment Details</h2>  
      <CardElement className="card-input" />  
      {error && <p className="error-message">{error}</p>}  
      <button type="submit" className="pay-btn" disabled={!stripe}>  
        Pay Now  
      </button>  
    </form>  
  );  
};  

const Payment = () => {  
  return (  
    <div className="payment-page">  
      <Elements stripe={stripePromise}>  
        <PaymentForm />  
      </Elements>  
    </div>  
  );  
};  

export default Payment;  