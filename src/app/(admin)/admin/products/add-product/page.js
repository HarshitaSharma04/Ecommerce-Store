"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

function AddProduct() {
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
    price: "",
    collection: "",
    // variant: [{ size: "", color: "" }],
  });

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Black", "White"];
  const categories = ["clothing", "electronics", "home", "sports"];
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    const updatedVariant = [...productData.variant];
    updatedVariant[0] = {
      ...updatedVariant[0],
      [name]: value,
    };
    setProductData((prev) => ({
      ...prev,
      variant: updatedVariant,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!productData.productName) {
      newErrors.productName = "Product name is required";
    } else if (productData.productName.length < 3) {
      newErrors.productName = "Minimum 3 characters";
    }
    // else if (productData.productName.length > 10) {
    //   newErrors.productName = "Maximum 15 characters";
    // }
    if (!productData.description) newErrors.description = "Required";
    if (!productData.brand) newErrors.brand = "Required";
    if (!productData.category) newErrors.category = "Required";
    if (!productData.stock) newErrors.stock = "Required";
    else if (isNaN(productData.stock)) newErrors.stock = "Must be a number";
    if (!productData.price) newErrors.price = "Required";
    else if (isNaN(productData.price)) newErrors.price = "Must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productData.productName,
          description: productData.description,
          category: productData.category,
          brand: productData.brand,
          stock: productData.stock,
          price: productData.price,
          collection: productData.collection,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        console.log("✅ Newly created product: ", result.data);
        setProductData({
          productName: "",
          description: "",
          category: "",
          brand: "",
          stock: "",
          price: "",
          collection: "",
        });
        router.push("/admin/products");
      } else {
        console.log("❌ Failed:", result.message);
      }
    } catch (error) {
      console.log("error : ", error.message);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4} fontSize="30px">
        Add Product
      </Typography>

      <Box display="flex" justifyContent="center">
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          sx={{ maxWidth: "1200px", width: "100%" }}
        >
          {/* Image Section */}
          <Grid item sx={{ width: "30%" }}>
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                p: 3,
                backgroundColor: "#fff",
              }}
            >
              <Avatar
                variant="circular"
                src="/shirt.jpg"
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography fontWeight={700} fontSize="1.2rem">
                Product Image
              </Typography>
              <Typography color="text.secondary">
                Preview or upload an image
              </Typography>

              <Divider
                sx={{
                  width: "100%",
                  mx: "auto",
                  my: 3,
                  borderColor: "#e2e8f0",
                  borderBottomWidth: "2px",
                }}
              />

              <Button
                variant="text"
                sx={{
                  color: "#6366f1",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Upload Image
              </Button>
            </Stack>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={12} sx={{ width: "60%" }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                p: 3,
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={2}>
                Product Details
              </Typography>

              <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  error={!!errors.productName}
                  helperText={errors.productName}
                />
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  error={!!errors.brand}
                  helperText={errors.brand}
                />
                <TextField
                  fullWidth
                  label="Collection"
                  name="collection"
                  value={productData.collection}
                  onChange={handleChange}
                  error={!!errors.collection}
                  helperText={errors.collection}
                />
              </Box>

              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={2}
                value={productData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  error={!!errors.category}
                  helperText={errors.category}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                />

                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                />
              </Box>

              {/* <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Size"
                  name="size"
                  value={productData.variant[0].size}
                  onChange={handleVariantChange}
                >
                  {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Color"
                  name="color"
                  value={productData.variant[0].color}
                  onChange={handleVariantChange}
                >
                  {colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </TextField>
              </Box> */}

              <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

              <Box textAlign="right">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "#6366f1",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.3,
                    borderRadius: 2,
                    ":hover": { background: "#4f46e5" },
                  }}
                >
                  Create Product
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AddProduct;
