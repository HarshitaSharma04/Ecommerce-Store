"use client";

import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ onSubmit }) => {
  const [isCardReady, setIsCardReady] = useState(false);

  return (
    <form onSubmit={onSubmit} style={{ position: "relative", minHeight: 150 }}>
      {/* Loader over CardElement until it's ready */}
      {!isCardReady && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* PaymentElement becomes visible after it's ready */}
      <Box sx={{ opacity: isCardReady ? 1 : 0.4 }}>
        <PaymentElement onReady={() => setIsCardReady(true)} />
      </Box>
    </form>
  );
};

export const PayButton = ({ disabled, isLoading }) => (
  <Button
    variant="contained"
    color="primary"
    disabled={disabled}
    type="submit"
    sx={{
      position: "absolute",
      bottom: 20,
      right: 0,
      minWidth: 120,
    }}
  >
    {isLoading ? "Processing..." : "Pay"}
  </Button>
);

export default PaymentForm;
