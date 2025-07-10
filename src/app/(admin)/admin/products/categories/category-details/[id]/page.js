"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Typography,
  Box,
  Skeleton,
  Card,
  CardContent,
  Divider,
  Grid,
  Container,
  Button,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";

export default function CategoryDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`);
        const result = await res.json();
        console.log("Category found : ", result);
        if (res.ok && result.data) {
          console.log("resonse form server : ", result);
          setCategory(result.data);
        } else {
          console.error("Error:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchCategoryById();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6">Loading category...</Typography>
      </Container>
    );
  }

  if (!category) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          Category not found.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => router.push("/admin/products/categories")}
        >
          Back to Categories
        </Button>
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
        flexWrap="wrap"
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          sx={{ textTransform: "none", borderRadius: "8px", p: "10px 20px" }}
          onClick={() => {
            router.push("/admin/products/categories");
          }}
        >
          Back
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Category Details
      </Typography>

      <Card sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={4}>
          {/* Image */}
          <Grid item xs={12} md={5}>
            <Avatar
              variant="rounded"
              src={category?.image || "/product_default_image.jpg"}
              alt="Category Image"
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

          {/* Details */}
          <Grid item xs={12} md={7}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {category.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Slug: {category.slug}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1">{category.description}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
