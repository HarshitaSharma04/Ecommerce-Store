"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Divider,
  Stack,
  Rating,
} from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";
import { DummyOrders } from "@/data/consumer-dummy-data/dummy-order";

function OrderPage() {
  const [orderItems, setOrderItems] = useState(DummyOrders);

  const handleToggleFavorite = (id) => {
    const updated = orderItems.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setOrderItems(updated);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Orders
      </Typography>

      <Stack spacing={3}>
        {orderItems.map((order, index) => {
          const product = order.products[0];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
                p={2}
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor: "#fafafa",
                  gap: 2,
                  position: "relative",
                }}
              >
                {/* Wishlist Icon */}
                <IconButton
                  onClick={() => handleToggleFavorite(order.id)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#fce4ec" },
                  }}
                >
                  {order.isFavorite ? (
                    <FavoriteIcon sx={{ color: "#e91e63" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "#e91e63" }} />
                  )}
                </IconButton>

                {/* Product Image */}
                <Image
                  src={product.productImage}
                  alt={product.productName}
                  width={120}
                  height={120}
                  style={{ objectFit: "cover", borderRadius: 12 }}
                />

                {/* Order Details */}
                <Box flex={1} ml={2}>
                  <Typography fontWeight="bold">{product.productName}</Typography>
                  <Typography fontSize={14} color="text.secondary">
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">
                    Status: {order.status}
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">
                    Delivery by: {order.deliveryDate}
                  </Typography>
                  <Box display="flex" gap={1} mt={1}>
                    <Typography fontWeight="bold" color="green">
                      ₹{product.price}
                    </Typography>
                    <Typography
                      sx={{ textDecoration: "line-through" }}
                      color="text.secondary"
                    >
                      ₹{order.totalAmount}
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Stack direction="row" spacing={1} mt={{ xs: 2, sm: 0 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={order.status !== "Processing"}
                  >
                    Cancel
                  </Button>
                  <Button variant="outlined" color="primary">
                    Track
                  </Button>
                  <Button variant="contained" color="primary">
                    Buy Again
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          );
        })}
      </Stack>
    </Container>
  );
}

export default OrderPage;
