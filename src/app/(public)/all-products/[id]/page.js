"use client";
import { useParams } from "next/navigation";
import {
  Typography,
  Box,
  Skeleton,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Chip,
  Grid,
  Container,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("/product_default_image.jpg");
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    const fetchProductById = async (id) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const result = await res.json();
        if (result.success) {
          setProduct(result.data);
          console.log("result of product detail is: ", result);
        } else {
          console.error("Error:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchProductById(id);
  }, [id]);

  const handleNavigateWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 1500);
  };

  const stockCalculate = (variants) => {
    return variants.reduce(
      (sum, v) => sum + (typeof v.stock === "number" ? v.stock : 0),
      0
    );
  };

  const handleAddToCart = () => {
    const variant = product?.variant?.[selectedVariant];
    if (!variant) {
      console.error("Variant not found. selectedVariant =", selectedVariant);
      return;
    }

    const cartItem = {
      productId: product.id,
      variantId: variant.variantId,
      name: `${product.name} - ${variant.name}`,
      image: variant.image || product.image,
      price: variant.price,
      quantity: 1,
    };

    console.log("dispatch item :", cartItem)
    dispatch(addToCart(cartItem));
    
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={48} color="primary" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flex-wrap="wrap"
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          sx={{ textTransform: "none", borderRadius: "8px", p: "10px 20px" }}
          onClick={() => {
            handleNavigateWithLoading("/all-products");
          }}
        >
          Back
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>

      <Card sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={4}>
          {/* Left Side - Image */}
          <Grid item xs={12} md={5}>
            <Avatar
              variant="rounded"
              src={
                selectedVariant !== null
                  ? product.variant[selectedVariant].image
                  : product.image || "/product_default_image.jpg"
              }
              alt="Product Image"
              sx={{
                width: 350,
                height: 350,
                mb: 1,
                border: "2px solid #e0e0e0",
                transition: "0.3s",
                "&:hover": { opacity: 0.8 },
              }}
            />
          </Grid>

          {/* Right Side - Details */}
          <Grid item xs={12} md={7}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                SKU: {product.sku}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                {selectedVariant !== null ? (
                  <>
                    <Chip
                      label={`₹${product.variant[selectedVariant].price}`}
                      color="success"
                      size="medium"
                    />
                    <Chip
                      label={`Stock: ${product.variant[selectedVariant].stock}`}
                      color={
                        product.variant[selectedVariant].stock > 0
                          ? "warning"
                          : "error"
                      }
                      size="medium"
                    />
                  </>
                ) : (
                  <Chip
                    label="Select a Variant"
                    color="default"
                    size="medium"
                  />
                )}

                <Chip
                  label={product.status}
                  color={product.status === "active" ? "success" : "error"}
                  size="medium"
                />
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                {product.category && (
                  <Chip
                    label={`Category: ${product.category?.name || "N/A"}`}
                    variant="outlined"
                    size="small"
                  />
                )}
                {product.collection && (
                  <Chip
                    label={`Collection: ${product.collection}`}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Stack>

              <Button
                variant="outlined"
                onClick={handleAddToCart}
                sx={{
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
          </Grid>
        </Grid>

        {/* Variants Section */}
        {product.variant && product.variant.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Variants
            </Typography>

            <Grid container spacing={2}>
              {product.variant.map((variant, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    variant="outlined"
                    onClick={() => setSelectedVariant(index)}
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      backgroundColor:
                        selectedVariant === index ? "#a4bfcc" : "#ffffff",
                      color: "#fff",
                      border:
                        selectedVariant === index
                          ? "2px solid #a4bfcc"
                          : "1px solid #444",
                      boxShadow:
                        selectedVariant === index ? "0 0 10px #a4bfcc" : "none",
                      transition: "0.3s ease",
                      // "&:hover": {
                      //   backgroundColor: "#333",
                      // },
                    }}
                  >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Box
                        component="img"
                        src={variant.image || "/product_default_image.jpg"}
                        alt={variant.name}
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: 2,
                          objectFit: "cover",
                        }}
                      />
                      <Box>
                        <Typography fontWeight={600}>{variant.name}</Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {variant.description}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={`Price: ₹${variant.price}`}
                            color="success"
                            size="small"
                          />
                          <Chip
                            label={`Stock: ${variant.stock}`}
                            color={variant.stock > 0 ? "warning" : "error"}
                            size="small"
                          />
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Card>
    </Container>
  );
}
