"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Rating,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DummyCart } from "@/data/consumer-dummy-data/dummy-cart";
import { motion } from "framer-motion";

function CartPage() {
  const [cartItems, setCartItems] = useState(DummyCart);

  const handleToggleFavorite = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setCartItems(updated);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Cart
      </Typography>

      <Grid container spacing={3} justifyContent="flex-start">
        {cartItems.map((cart, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                {/* Wishlist Heart Icon */}
                <IconButton
                  onClick={() => handleToggleFavorite(cart.id)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "white",
                    zIndex: 1,
                    "&:hover": { backgroundColor: "#fce4ec" },
                  }}
                >
                  {cart.isFavorite ? (
                    <FavoriteIcon sx={{ color: "#e91e63" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "#e91e63" }} />
                  )}
                </IconButton>

                <CardContent>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Image
                      src={cart.productImage}
                      alt={cart.productName}
                      width={300}
                      height={200}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />

                    <Typography fontWeight="bold" fontSize={16}>
                      {cart.productName}
                    </Typography>

                    <Box display="flex" gap={1} alignItems="center">
                      <Typography fontWeight="bold" color="green">
                        ₹{cart.price}
                      </Typography>
                      <Typography
                        sx={{ textDecoration: "line-through" }}
                        color="text.secondary"
                      >
                        ₹{cart.originalPrice}
                      </Typography>
                      <Typography color="error">
                        {cart.discountPercent}% Off
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {cart.category} • {cart.brand}
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Rating
                        value={cart.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({cart.reviewCount})
                      </Typography>
                    </Box>

                    <Typography variant="body2">
                      Stock:{" "}
                      {cart.Stock > 0 ? `${cart.Stock} units` : "Out of Stock"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Delivery by: {cart.deliveryDate}
                    </Typography>

                    <Box display="flex" flexDirection="row" gap={2}>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 1, borderRadius: 2 }}
                        disabled={cart.Stock <= 0}
                      >
                        Remove from Cart
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1, borderRadius: 2 }}
                        disabled={cart.Stock <= 0}
                      >
                        Buy Now
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CartPage;
