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
import EditIcon from "@mui/icons-material/Edit";

export default function ProductDetailPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("/product_default_image.jpg");

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
            handleNavigateWithLoading("/admin/products");
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          sx={{ textTransform: "none", borderRadius: "8px", p: "10px 20px" }}
          onClick={() => {
            router.push(
              `/admin/products/update-product/${product.id}`
            );
          }}
        >
          Edit
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
              src={product.image || "/product_default_image.jpg"}
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
                <Chip
                  label={`₹${product.variant[0].price}`}
                  color="success"
                  size="medium"
                />
                <Chip
                  label={`Stock: ${stockCalculate(product.variant)}`}
                  color={product.stock > 0 ? "warning" : "error"}
                  size="medium"
                />
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
                  <Card variant="outlined" sx={{ p: 2 }}>
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
                            label={`₹${variant.price}`}
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
