"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Stack,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import Image from "next/image";
import { DummyCart } from "@/data/consumer-dummy-data/dummy-cart";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CartSummary = ({
  productsTotal = 134.98,
  shipping = 9.99,
  itemsCount = 0,
}) => {
  const router = useRouter();
  const total = productsTotal + shipping;

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        p: 3,
        boxShadow: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Order Summary
      </Typography>

      {/* Products */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="body1" fontWeight="500">
            Subtotal ({itemsCount} {itemsCount === 1 ? "item" : "items"})
          </Typography>
        </Box>
        <Typography fontWeight="500">${productsTotal.toFixed(2)}</Typography>
      </Box>

      {/* Shipping */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocalShippingIcon fontSize="small" />
          <Typography variant="body1" fontWeight="500">
            Shipping
          </Typography>
        </Box>
        <Typography fontWeight="500">${shipping.toFixed(2)}</Typography>
      </Box>

      {/* Discount */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <DiscountIcon fontSize="small" />
          <Typography variant="body1" fontWeight="500">
            Discount
          </Typography>
        </Box>
        <Typography fontWeight="500">-$0.00</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="body1" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          ${total.toFixed(2)}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<ShoppingCartCheckoutIcon />}
        sx={{
          py: 1.5,
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
        }}
        onClick={() => {
          router.push("/checkouts");
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

function CartPage() {
  const router = useRouter();
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Redux cartItems:", cartItems);

  const dispatch = useDispatch();

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h5" mb={2}>
            Your cart is empty
          </Typography>
          <Button variant="contained" href="/">
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              {cartItems.map((cart, index) => (
                <motion.div
                  key={cart.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    p={3}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 1,
                      backgroundColor: "background.paper",
                      position: "relative",
                      gap: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {/* Delete Button */}
                    <IconButton
                      onClick={() => handleRemoveItem(cart.id)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "text.secondary",
                        "&:hover": { color: "error.main" },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    {/* Product Image */}
                    <Box
                      sx={{
                        width: { xs: "100%", sm: 120 },
                        height: 120,
                        position: "relative",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={cart.image}
                        alt={cart.image}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>

                    {/* Product Details */}
                    <Box flex={1} width="100%">
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mb: 0.5 }}
                          >
                            {cart.name}
                          </Typography>
                         
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          ₹{cart.price.toFixed(2)}
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <Chip
                          label={cart.category}
                          size="small"
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                          Qty: {cart.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Stack>
          </Grid>

          {/* Order Summary */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <CartSummary
              productsTotal={calculateSubtotal()}
              shipping={9.99}
              itemsCount={cartItems.length}
            />

            {/* Promo Code */}
            <Box
              mt={3}
              p={2}
              sx={{
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" fontWeight="bold" mb={1}>
                Have a promo code?
              </Typography>
              <Box display="flex" gap={1}>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                  }}
                />
                <Button variant="outlined" size="small">
                  Apply
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CartPage;
