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
} from "@mui/material";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';

export default function CategoryDetail() {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductById = async (id) => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`);
        const result = await res.json();
        if (result.success) {
          setProduct(result.data);
        } else {
          console.error("Error:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); 
      }
    };
    fetchProductById(id);
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width={200} height={40} />
        <Card sx={{ mt: 3, p: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Skeleton variant="rectangular" height={400} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 1 }} />
              <Skeleton
                variant="text"
                width="100%"
                height={100}
                sx={{ mt: 2 }}
              />
              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <Skeleton variant="rectangular" width={100} height={32} />
                <Skeleton variant="rectangular" width={100} height={32} />
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  }

  if (!category) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">category not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4} display="flex" alignItems="center" justifyContent="space-between" flex-wrap="wrap">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          sx={{ textTransform: "none", borderRadius: "8px", p: "10px 20px" }}
          onClick={() => {
            router.push("/admin/categories");
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          sx={{ textTransform: "none", borderRadius: "8px", p: "10px 20px" }}
          // onClick={() => {
          //   router.push("/admin/products");
          // }}
        >
          Edit
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Category Details
      </Typography>

      <Card sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={4}>
          {/* Left Side - Image */}
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                maxHeight: 400,
                objectFit: "contain",
              }}
              image={category.image}
              alt={category.name}
            />
          </Grid>

          {/* Right Side - Details */}
          <Grid item xs={12} md={7}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                SKU: {category.sku}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" paragraph>
                {category.description}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Chip
                  label={`₹${category.price}`}
                  color="success"
                  size="medium"
                />
                <Chip
                  label={`Stock: ${category.stock}`}
                  color={category.stock > 0 ? "warning" : "error"}
                  size="medium"
                />
                <Chip
                  label={category.status}
                  color={category.status === "active" ? "success" : "error"}
                  size="medium"
                />
              </Stack>

              {/* <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                {product.category && (
                  <Chip
                    label={`Category: ${product.category}`}
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
              </Stack> */}
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
                        src={variant.image}
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
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <Chip label={`Size: ${variant.size}`} size="small" />
                          <Chip
                            label={`Color: ${variant.color}`}
                            size="small"
                          />
                          {variant.material && (
                            <Chip
                              label={`Material: ${variant.material}`}
                              size="small"
                            />
                          )}
                        </Stack>
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
