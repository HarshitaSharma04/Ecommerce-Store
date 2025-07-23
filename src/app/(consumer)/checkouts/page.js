"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutPageContent from "./checkout-page-content";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Call your API route to get the clientSecret
    const fetchClientSecret = async () => {
      const res = await fetch("/api/create-payment-intent", { method: "POST" });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    fetchClientSecret();
  }, []);

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <CheckoutPageContent />
    </Elements>
  );
}
