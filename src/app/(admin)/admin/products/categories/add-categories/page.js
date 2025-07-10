"use client";
import React, { useRef, useState } from "react";
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
import toast from "react-hot-toast";
import { Form } from "react-hook-form";

function AddCategories() {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState({
    categoryName: "",
    slug: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("/product_default_image.jpg");
  const fileInputRef = useRef(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("jdbcjd");
    e.preventDefault();
    if (!validate()) {
      console.log("Validation failed:", errors);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", categoriesData.categoryName);
      formData.append("description", categoriesData.description);
      formData.append("image", imageUrl);
      formData.append("merchantId", "68661e7da8804fafee40888b");

      console.log("from data to be subbmitted : ", formData);
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        console.log("✅ Newly created product: ", result);
        setCategoriesData({
          categoryName: "",
          description: "",
        });
        toast.success("category Created Successfully", { duration: 3000 });
        setTimeout(() => {
          router.push("/admin/products/categories");
        }, 4000);
      } else {
        console.log("❌ Failed:", result.message);
        toast.error("❌ Failed to Create a category");
      }
    } catch (error) {
      console.log("error : ", error.message);
    }
  };

  // upload image to cloudinary
  const handleUploadToCloudinary = async () => {
    console.log("image Uploading");
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log("image :", formData);
    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Cloudinary Upload URL:", data.url);
      if (res.ok && data?.url) {
        console.log("✅ Image uploaded successfully:", data.url);
        setImageUrl(data.url); // Update with Cloudinary image
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data?.error || "Image upload failed");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4} fontSize="30px">
        Add Product Category
      </Typography>

      <Box display="flex" justifyContent="center">
        <Grid
          component="form"
          onSubmit={handleSubmit}
          container
          spacing={4}
          alignItems="flex-start"
          sx={{ maxWidth: "1200px", width: "100%" }}
        >
          {/* Image Section */}
          <Grid item sx={{ width: "30%" }}>
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                p: 3,
                bgcolor: "#fff",
                // boxShadow: 1,
              }}
            >
              {/* Image Preview */}
              <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                <Avatar
                  variant="rounded"
                  src={imageUrl}
                  alt="Category Image"
                  sx={{
                    width: 140,
                    height: 140,
                    mb: 1,
                    border: "2px solid #e0e0e0",
                    transition: "0.3s",
                    "&:hover": { opacity: 0.8 },
                  }}
                />
              </label>

              <input
                type="file"
                id="upload-image"
                hidden
                onChange={handleImageChange}
                ref={fileInputRef}
                accept="image/*"
              />

              {/* Product Name */}
              <Typography fontWeight={600} fontSize="1.2rem" textAlign="center">
                {categoriesData.categoryName || "Category Image"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Click image or use buttons to upload
              </Typography>

              <Divider
                sx={{
                  width: "100%",
                  my: 2,
                  borderColor: "#e2e8f0",
                  borderBottomWidth: "2px",
                }}
              />

              {/* Action Buttons */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Choose Image
                </Button>
                <Button
                  variant="contained"
                  onClick={handleUploadToCloudinary} // your upload handler
                  disabled={!selectedFile}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Upload Image
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={12} sx={{ width: "60%" }}>
            <Box
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

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
              >
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
                  label="Slug"
                  name="slug"
                  value={categoriesData.slug}
                  onChange={handleChange}
                />

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
              </Box>

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
                  Create Category
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AddCategories;
