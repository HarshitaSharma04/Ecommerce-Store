"use client";

import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [products, setProduct] = useState([]);
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("api/admin/products");
        const result = await res.json();
        if (res.ok && result.success) {
          const firstThree = result.data.slice(0, 3);
          setProduct(firstThree);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Box>
      {/* ✅ Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #15b79e 0%, #b5c0d2 40%, #122647 100%)",
            py: { xs: 10, md: 14 },
            textAlign: "center",
            color: "white",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Discover the Newest Trends
            </Typography>
            <Typography variant="h6" mb={4}>
              Your one-stop shop for clothing, electronics, and accessories.
            </Typography>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#15b79e",
                color: "#122647",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#13a28c",
                },
              }}
            >
              Shop Now
            </Button>
          </Container>
        </Box>
      </motion.div>

      {/* ✅ Featured Products Section */}
      <Container sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Typography
            variant="overline"
            textAlign="center"
            display="block"
            color="#15b79e"
            mb={1}
          >
            New Arrivals – {currentMonth}
          </Typography>

          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            color="#122647"
            gutterBottom
          >
            Featured Products
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt: 4,
          }}
        >
          {products.map((product, i) => {
            const variant = product.variant?.[0];

            return (
              <Link
                key={product.id}
                href={`/all-products/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <Card
                    sx={{
                      width: 280,
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
                      image={product.image || "/product_default_image.jpg"}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="#122647">
                        {product.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {product.description}
                      </Typography>
                      {variant && (
                        <>
                          <Typography variant="body2" fontWeight={500}>
                            Variant: {variant.name || "N/A"}
                          </Typography>
                          <Typography color="text.secondary">
                            ₹{variant.price ?? "N/A"}
                          </Typography>
                        </>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box textAlign="center" mt={5}>
            <Button
              component={Link}
              href="/all-products"
              variant="text"
              sx={{
                color: "#15b79e",
                fontWeight: "bold",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View All Products →
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
