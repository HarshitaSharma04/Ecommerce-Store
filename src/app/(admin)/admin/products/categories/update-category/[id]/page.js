"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { ArrowBack, Label } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Products from "../../../page";
import { Form } from "react-hook-form";

function UpdateCategory() {
  // use id params
  const { id } = useParams();
  // errors
  const [errors, setErrors] = useState({});
  // use for redirect to another page
  const router = useRouter();

  // for image
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("/product_default_image.jpg");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  // category state
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    description: "",
    slug:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // validation
  const validate = () => {
    const newErrors = {};
    if (!categoryData.categoryName) {
      newErrors.categoryName = "Category name is required";
    } else if (categoryData.categoryName.length < 3) {
      newErrors.categoryName = "Minimum 3 characters";
    }
    if (!categoryData.description) newErrors.description = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // fetch existing product
    useEffect(() => {
      console.log("use id :", id)
      const fetchCategoryDetail = async () => {
        try {
          const res = await fetch(`/api/admin/categories/${id}`);
          console.log("Response status:", res.status);
          const result = await res.json();
          console.log("fetched category :", result)
          if (res.ok && result?.data) {
            const category = result.data;
            console.log("fetching category detail: ", category);
            setCategoryData({
              categoryName: category.name,
              description: category.description,
              slug: category.slug|| ""
            });
            setImageUrl(category.image || "/product_default_image.jpg");
          } else {
            toast.error("Failed to fetch category detail");
          }
        } catch (error) {
          toast.error("Something Wrong");
          console.log("error : ", error.message);
        } 
      };
      fetchCategoryDetail();
    }, [id]);

  // submit data to backend
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("form submit");
      if (!validate()) {
        console.log("Validation failed:", errors);
        return;
      }
      try {
        const formData = new FormData();
        formData.append("name", categoryData.categoryName);
        formData.append("description", categoryData.description);
        formData.append("slug", categoryData.slug);
        formData.append("image", imageUrl);
        console.log("Form data to be submitted:", formData);

        const res = await fetch(`/api/admin/categories/${id}`, {
          method: "PUT",
          body: formData,
        });

        const result = await res.json();
        console.log("response from server : ", result.data);
        if (res.ok) {
          console.log("✅ Update category: ", result);
          toast.success("Update Successfully", { duration: 3000 });
          router.push(`/admin/products/categories`);
          setCategoryData(result)
        } else {
          console.log("Failed:", result.message);
          toast.error("Failed to Update Product");
        }
      } catch (error) {
        console.log("error : ", error.message);
        toast.error("An error occurred while updating");
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
      <>
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
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              p: "10px 20px",
            }}
            onClick={() => {
              router.push(`/admin/products/categories`);
            }}
          >
            Back
          </Button>
        </Box>

        {/* add product text */}
        <Typography variant="h4" mb={4} fontSize="30px">
          Update Category
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
                <Typography
                  fontWeight={600}
                  fontSize="1.2rem"
                  textAlign="center"
                >
                  {categoryData.categoryName || "Product Image"}
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
                  Edit Category Details
                </Typography>

                <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Category Name"
                    name="categoryName"
                    value={categoryData.categoryName}
                    onChange={handleChange}
                    error={!!errors.categoryName}
                    helperText={errors.categoryName}
                  />
                  <TextField
                    fullWidth
                    label="Slug"
                    name="slug"
                    value={categoryData.slug}
                    onChange={handleChange}
                    error={!!errors.slug}
                    helperText={errors.slug}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={2}
                    value={categoryData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={{ mb: 2 }}
                  />
                </Box>
                <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

                <Box
                  sx={{
                    textAlign: "end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: "8px",
                      p: "10px 20px",
                    }}
                    // onClick={() => {
                    //   router.push(`/admin/products/product-details/${id}`);
                    // }}
                  >
                    Save Category
                  </Button>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </>
    </Box>
  );
}

export default UpdateCategory;
