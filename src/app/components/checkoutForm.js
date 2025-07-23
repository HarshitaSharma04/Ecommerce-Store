"use client";

import { Box, Button } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      },
    });
    console.log("result:", result);
    if (result.error) {
      console.error("❌ Payment error:", result.error.message);
    } else {
      console.log("✅ Payment processing...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        variant="contained"
        color="primary"
        disabled={!stripe}
        sx={{
          position: "absolute",
          bottom: 70, // Adjust this value as needed
          left: 0,
          zIndex: 2,
        }}
      >
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
