"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  boxClasses,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "react-hook-form";

function AddProduct() {
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [variants, setVariants] = useState([
    {
      variantName: "",
      description: "",
      stock: "",
      price: "",
    },
  ]);

  const handleRemoveVariant = (indexToRemove) => {
    // if (variants.length === 1) return; // prevent deleting the last one
    const updatedVariants = variants.filter((_, i) => i !== indexToRemove);
    setVariants(updatedVariants);
  };

  const handleAddVariantBox = () => {
    setVariants([
      ...variants,
      {
        variantName: "",
        description: "",
        stock: "",
        price: "",
      },
    ]);
  };
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

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [name]: value,
      };
      return updatedVariants;
    });
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const result = await res.json();
        console.log("result of categories : ", result);
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.log("error fetching categories : ", error.message);
      }
    };
    fetchCategories();
  }, []);

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
    console.log("jdbcjd");
    e.preventDefault();
    try {
      // const categoryMap = {
      //   Apparel: "6867cabccf812b31112e9688",
      //   Electronics: "6867cabccf812b31112e9689",
      //   Footwear: "6867cabccf812b31112e968a",
      //   Accessories: "6867cabccf812b31112e968b",
      //   Computers: "6867cabccf812b31112e968c",
      //   "Home & Kitchen": "6867cabccf812b31112e968d",
      // };
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productData.productName,
          description: productData.description,
          categoryId: productData.category.id,
          brand: productData.brand,
          merchantId: "68661e7da8804fafee40888b",
          stock: productData.stock,
          variant: variants.map((v) => ({
            name: v.variantName,
            description: v.description,
            stock: v.stock,
            price: v.price,
          })),
        }),
      });
      const result = await res.json();
      console.log("result : ", result);
      if (res.ok) {
        console.log("✅ Newly created product: ", result);
        setProductData({
          productName: "",
          description: "",
          category: "",
          brand: "",
          stock: "",
          price: "",
          collection: "",
          variant: "variants",
        });
        setVariants([
          {
            variantName: "",
            description: "",
            stock: "",
            price: "",
          },
        ]);
        // router.push("/admin/products");
      } else {
        console.log("❌ Failed:", result.message);
      }
    } catch (error) {
      console.log("error : ", error.message);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* add variant and back button  */}
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
            router.push("/admin/products");
          }}
        >
          Back
        </Button>
      </Box>

      {/* add product text */}
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
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>

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

              <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />
            </Box>
          </Grid>

          {/* add variant box */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#fafafa",
              width: "100%",
            }}
          >
            <Box
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Typography variant="h6" gutterBottom>
                Add Variant
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleAddVariantBox}
                startIcon={<AddCircleIcon />}
                sx={{
                  textTransform: "none",
                  // backgroundColor: "#4caf50",
                  // ":hover": { backgroundColor: "#388e3c" },
                }}
              >
                Add More Variant
              </Button>
            </Box>

            <AnimatePresence>
              {variants.map((variant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Stack spacing={2} mb={4} component={Box}>
                    {index !== 0 && (
                      <Box sx={{ textAlign: "end" }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleRemoveVariant(index)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    )}
                    <TextField
                      fullWidth
                      label="Variant Name"
                      name="variantName"
                      value={variant.variantName}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                    <TextField
                      fullWidth
                      label="Variant Description"
                      name="description"
                      value={variant.description}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                    <Stack direction="row" spacing={2}>
                      <TextField
                        fullWidth
                        label="Stock"
                        name="stock"
                        type="number"
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(index, e)}
                      />
                      <TextField
                        fullWidth
                        label="Price (₹)"
                        name="price"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, e)}
                      />
                    </Stack>
                  </Stack>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                p: "10px 20px",
              }}
              // onClick={() => {
              //   router.push("/admin/products");
              // }}
            >
              Add Product
            </Button>
          </Box>

          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              p: "10px 20px",
            }}
            // onClick={() => {
            //   router.push("/admin/products");
            // }}
          >
            Add Product
          </Button> */}
        </Grid>
      </Box>
    </Box>
  );
}

export default AddProduct;
