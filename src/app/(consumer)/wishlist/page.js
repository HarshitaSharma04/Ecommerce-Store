"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Stack,
  Rating,
} from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";
import { DummyWishlistItems } from "@/data/consumer-dummy-data/dummy-wishlist";
import PaginationComponents from "@/app/components/common/paginationComponents";

function WishlistPage() {
  const itemsPerPage = 5
  const [wishlistItems, setWishlistItems] = useState(DummyWishlistItems);
  const [currentPage, setCurrenPage] = useState(1);
  const currentItems = wishlistItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleFavorite = (id) => {
    const updated = wishlistItems.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setWishlistItems(updated);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Wishlist
      </Typography>

      <Stack spacing={3}>
        {currentItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems="center"
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
                onClick={() => handleToggleFavorite(item.id)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#fce4ec" },
                }}
              >
                {item.isFavorite ? (
                  <FavoriteIcon sx={{ color: "#e91e63" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#e91e63" }} />
                )}
              </IconButton>

              {/* Product Image */}
              <Image
                src={item.productImage}
                alt={item.productName}
                width={120}
                height={120}
                style={{ objectFit: "cover", borderRadius: 12 }}
              />

              {/* Product Info */}
              <Box flex={1} ml={2}>
                <Typography fontWeight="bold">{item.productName}</Typography>
                <Typography fontSize={14} color="text.secondary">
                  {item.category} • {item.brand}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <Rating
                    value={item.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({item.reviewCount})
                  </Typography>
                </Box>
                <Box display="flex" gap={1} mt={1}>
                  <Typography fontWeight="bold" color="green">
                    ₹{item.price}
                  </Typography>
                  <Typography
                    sx={{ textDecoration: "line-through" }}
                    color="text.secondary"
                  >
                    ₹{item.originalPrice}
                  </Typography>
                  <Typography color="error">
                    {item.discountPercent}% Off
                  </Typography>
                </Box>
                <Typography fontSize={14}>
                  Stock:{" "}
                  {item.Stock > 0 ? `${item.Stock} units` : "Out of Stock"}
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                  Delivery by: {item.deliveryDate}
                </Typography>
              </Box>

              {/* Action */}
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
                disabled={item.Stock <= 0}
              >
                Buy Now
              </Button>
            </Box>
          </motion.div>
        ))}

        <PaginationComponents
          totalItems={wishlistItems.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrenPage(page)}
        />
      </Stack>
    </Container>
  );
}

export default WishlistPage;
