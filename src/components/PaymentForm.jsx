import React from "react";
import axios from "../api/paymentApi";
import { env_variable } from "../config/env";

const PaymentForm = () => {
  const handlePayment = async () => {
    const { data: order } = await axios.post("/payment/createOrder", {
      amount: 500,
      currency: "INR",
    });
    const options = {
      key: env_variable.razorpay_keyID,
      amount: order.amount,
      currency: order.currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const paymentResult = {
          order_id: order.id,
          payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const verify = await axios.post(
          "/payment/verifyPayment",
          paymentResult
        );
        if (verify.data.message === "Payment verified successfully") {
          alert("Payment successful!");
        } else {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFormStyle = {
    backgroundImage: "url('https://static.startuptalky.com/2023/09/Razorpay-success-story-startuptalky.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "brown",
    textAlign: "center",
    position: "fixed",
    top: 0,
    left: 0,
    margin: 0,
    overflow: "hidden",
  };

  const headingStyle = {
    margin: "-100px 0 10px 0",
    fontSize: "3rem", // Increase font size
    color: "#8B4513", // Change to gold color
  };

  const subheadingStyle = {
    margin: "10px 0",
    fontSize: "2rem", // Adjust subheading size
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    marginTop: "150px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  return (
    <div style={paymentFormStyle}>
      <h2 style={headingStyle}>Welcome to Our Payment Page</h2>
      <h2 style={subheadingStyle}>Complete Your Payment</h2>
      <button 
        style={buttonStyle}
        onClick={handlePayment}
        onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"} 
        onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;
