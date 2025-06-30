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

function AddCategories() {
  const [categoriesData, setCategoriesData] = useState({
    categoryName: "",
    description: "",
    brand: "",
    stock: "",
    status: "",
    price: "",
    variant: [{ size: "", color: "" }],
  });

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Black", "White"];
  //   const categories = ["clothing", "electronics", "home", "sports"];
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriesData((prev) => ({
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
    const updatedVariant = [...categoriesData.variant];
    updatedVariant[0] = {
      ...updatedVariant[0],
      [name]: value,
    };
    setCategoriesData((prev) => ({
      ...prev,
      variant: updatedVariant,
    }));
  };

    const validate = () => {
      const newErrors = {};
      if (!categoriesData.categoryName) {
        newErrors.CategoryName = "Product name is required";
      } else if (categoriesData.categoryName.length < 3) {
        newErrors.CategoryName = "Minimum 3 characters";
      } else if (categoriesData.categoryName.length > 15) {
        newErrors.CategoryName = "Maximum 15 characters";
      }
      if (!categoriesData.description) newErrors.description = "Required";
      if (!categoriesData.brand) newErrors.brand = "Required";
      if (!categoriesData.category) newErrors.category = "Required";
      if (!categoriesData.stock) newErrors.stock = "Required";
      else if (isNaN(categoriesData.stock)) newErrors.stock = "Must be a number";
      if (!categoriesData.price) newErrors.price = "Required";
      else if (isNaN(categoriesData.price)) newErrors.price = "Must be a number";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ category data Submitted:", categoriesData);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4} fontSize="30px">
        Add Product Category
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
                Product Category Image
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
                Product category Details
              </Typography>

              <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Category"
                  name="categoryName"
                  value={categoriesData.categoryName}
                  onChange={handleChange}
                  error={!!errors.categoryName}
                  helperText={errors.categoryName}
                />
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={categoriesData.brand}
                  onChange={handleChange}
                  error={!!errors.brand}
                  helperText={errors.brand}
                />
              </Box>

              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={categoriesData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                sx={{ mb: 2 }}
              />

              {/* <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={categoriesData.category}
                  onChange={handleChange}
                  error={!!errors.category}
                  helperText={errors.category}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </MenuItem>
                  ))}
                </TextField> */}

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  value={categoriesData.stock}
                  onChange={handleChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                />
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  value={categoriesData.status}
                  onChange={handleChange}
                  error={!!errors.status}
                  helperText={errors.status}
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={categoriesData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Size"
                  name="size"
                  value={categoriesData.variant[0].size}
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
                  value={categoriesData.variant[0].color}
                  onChange={handleVariantChange}
                >
                  {colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/* <TextField
                fullWidth
                label="Price"
                name="price"
                value={categoriesData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
              /> */}
            </Box>

            {/* <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Size"
                  name="size"
                  value={categoriesData.variant[0].size}
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
                  value={categoriesData.variant[0].color}
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
            {/* </Box> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AddCategories;
