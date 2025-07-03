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
import Navbar from "../navbar";
import Footer from "../footer";

const products = [
  {
    id: 1,
    name: "Modern T-Shirt",
    price: "₹499",
    image: "shirt.jpg",
  },
  {
    id: 2,
    name: "Sports Shoes",
    price: "₹1,299",
    image: "shoes.jpg",
  },
  {
    id: 3,
    name: "Digital Watch",
    price: "₹2,499",
    image: "watch.jpg",
  },
];

export default function LandingPage() {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    // <main>
      <Box>
        {/* Hero Section */}
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

        {/* Featured Products */}
        <Container sx={{ py: 8 }}>
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

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
              mt: 4,
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
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
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom color="#122647">
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {product.price}
                  </Typography>
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
            ))}
          </Box>

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
        </Container>
      </Box>
    // </main>
  );
}
