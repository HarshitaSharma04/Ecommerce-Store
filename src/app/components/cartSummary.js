"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const CartSummary = ({ productsTotal = 134.98, shipping = 9.99 }) => {
  const total = productsTotal + shipping;

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#fff",
        borderRadius: 2,
        p: 3,
        maxWidth: 400,
      }}
    >
      {/* Products */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography fontWeight="bold">Products</Typography>
          <Typography fontSize={14} color="gray">
            4 selected
          </Typography>
        </Box>
        <Typography>${productsTotal.toFixed(2)}</Typography>
      </Box>

      {/* Shipping */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography fontWeight="bold">Shipping</Typography>
          <Typography fontSize={14} color="gray">
            Plus taxes
          </Typography>
        </Box>
        <Typography>${shipping.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ borderColor: "#444", my: 2 }} />

      {/* Total */}
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default CartSummary;
