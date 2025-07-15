"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Pagination,
  Typography,
  Chip,
  Container,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function AllProducts() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const result = await res.json();
        if (result.success) {
          setProducts(result.data);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.log("Error:", error.message);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchProducts();
  }, []);

  const paginatedProducts = products.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box p={3}>
      {loading ? (
        <Container
          maxWidth="lg"
          sx={{
            minHeight: "calc(100vh - 200px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={48} color="primary" />
        </Container>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" textAlign="center" mb={4}>
              All Products
            </Typography>
          </motion.div>

          {/* ✅ Product Cards */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 4,
              margin: "30px 88px",
            }}
          >
            {paginatedProducts.map((product, index) => {
              const variant = product.variant?.[0];
              const hasDiscount = variant?.discount > 0;
              const discountedPrice = hasDiscount
                ? variant.price - (variant.price * variant.discount) / 100
                : variant?.price;

              return (
                <Link
                  key={product.id}
                  href={`/all-products/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        width: 300,
                        backgroundColor: "#f8fafa",
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={product?.image || "/product_default_image.jpg"}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="#122647">
                          {product.name}
                        </Typography>
                        <Typography gutterBottom color="text.secondary">
                          {product.description || "No description provided."}
                        </Typography>

                        {variant && (
                          <Box mt={1}>
                            <Typography variant="body2" fontWeight={500}>
                              Variant: {variant.name || "N/A"}
                            </Typography>

                            <Box display="flex" alignItems="center" gap={1}>
                              {hasDiscount ? (
                                <>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      textDecoration: "line-through",
                                      color: "gray",
                                    }}
                                  >
                                    ₹{variant.price}
                                  </Typography>
                                  <Typography variant="body2" fontWeight={600}>
                                    ₹{Math.round(discountedPrice)}
                                  </Typography>
                                  <Chip
                                    label={`${variant.discount}% OFF`}
                                    color="error"
                                    size="small"
                                  />
                                </>
                              ) : (
                                <Typography variant="body2" fontWeight={600}>
                                  Price: ₹{variant.price}
                                </Typography>
                              )}
                            </Box>

                            <Typography variant="body2" mt={1}>
                              Stock: {variant.stock ?? "N/A"}
                            </Typography>
                          </Box>
                        )}

                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            mt: 2,
                            color: "#15b79e",
                            borderColor: "#15b79e",
                            "&:hover": {
                              backgroundColor: "#e6f8f5",
                              borderColor: "#13a28c",
                            },
                          }}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </Box>

          <Divider sx={{ mt: 5 }} />

          {/* ✅ Pagination */}
          <Box mt={5} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(products.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
              shape="rounded"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AllProducts;
