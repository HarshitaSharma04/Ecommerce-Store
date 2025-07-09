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
import Products from "../../page";
import { Form } from "react-hook-form";

function updateProduct() {
  // use id params
  const { id } = useParams();
  // loader
  const [loading, setLoading] = useState(true);
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

  // product state
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    category: "",
    collection: "",
  });

  // variant state
  const [variants, setVariants] = useState([
    {
      variantName: "",
      description: "",
      stock: "",
      price: "",
    },
  ]);

  const handleRemoveVariant = (indexToRemove) => {
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

  // validation
  const validate = () => {
    const newErrors = {};
    if (!productData.productName) {
      newErrors.productName = "Product name is required";
    } else if (productData.productName.length < 3) {
      newErrors.productName = "Minimum 3 characters";
    }
    if (!productData.description) newErrors.description = "Required";
    if (!productData.category) newErrors.category = "Required";

    // Validate variants
    variants.forEach((variant, index) => {
      if (!variant.variantName) {
        newErrors[`variantName_${index}`] = "Variant name is required";
      }
      if (!variant.description) {
        newErrors[`description_${index}`] = "Variant description is required";
      }
      if (!variant.stock) {
        newErrors[`stock_${index}`] = "Stock is required";
      } else if (isNaN(variant.stock)) {
        newErrors[`stock_${index}`] = "Stock must be a number";
      }
      if (!variant.price) {
        newErrors[`price_${index}`] = "Price is required";
      } else if (isNaN(variant.price)) {
        newErrors[`price_${index}`] = "Price must be a number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // fetch existing product
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const result = await res.json();
        if (res.ok && result?.data) {
          const product = result.data;
          console.log("fetching product detail: ", product);
          setProductData({
            productName: product.name,
            description: product.description,
            category: product.category?.id || "",
            collection: "All",
          });
          setImageUrl(product.image || "/product_default_image.jpg");
          setVariants(
            product.variant?.map((v) => ({
              variantName: v.name,
              description: v.description,
              stock: v.stock,
              price: v.price,
            })) || []
          );
        } else {
          toast.error("Failed to load Product");
        }
      } catch (error) {
        toast.error("Something Wrong");
        console.log("error : ", error.message);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchProductDetails();
  }, [id]);

  // submit data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("dmfvndmnv");

    if (!validate()) {
      console.log("Validation failed:", errors);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", productData.productName);
      formData.append("description", productData.description);
      formData.append("categoryId", productData.category);
      formData.append("collection", productData.collection);
      formData.append("image", imageUrl);
      formData.append(
        "variant",
        JSON.stringify(
          variants.map((v) => ({
            variantId: v.variantId || uuidv4(),
            name: v.variantName,
            description: v.description,
            stock: parseInt(v.stock),
            price: parseFloat(v.price),
            image: v.image || "",
          }))
        )
      );

      console.log("Form data to be submitted:", formData);

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        body: formData,
        // headers are automatically set by browser for FormData
      });

      const result = await res.json();
      console.log("response from server : ", result);
      if (res.ok) {
        console.log("✅ Update Product: ", result);
        toast.success("Update Successfully", { duration: 3000 });
        router.push(`/admin/products/product-details/${id}`);
      } else {
        console.log("Failed:", result.message);
        toast.error("Failed to Update Product");
      }
    } catch (error) {
      console.log("error : ", error.message);
      toast.error("An error occurred while updating");
    } finally {
      setLoading(false);
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

  // return (
  //   <Box sx={{ p: 4 }}>

  // <>
  //   <Box
  //     mb={4}
  //     display="flex"
  //     alignItems="center"
  //     justifyContent="space-between"
  //     flex-wrap="wrap"
  //   >
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       startIcon={<ArrowBack />}
  //       sx={{
  //         textTransform: "none",
  //         borderRadius: "8px",
  //         p: "10px 20px",
  //       }}
  //       onClick={() => {
  //         router.push(`/admin/products/product-details/${id}`);
  //       }}
  //     >
  //       Back
  //     </Button>
  //   </Box>

  //   {/* add product text */}
  //   <Typography variant="h4" mb={4} fontSize="30px">
  //     Update Product
  //   </Typography>

  //   <Box display="flex" justifyContent="center">
  //     <Grid
  //       component="form"
  //       onSubmit={handleSubmit}
  //       container
  //       spacing={4}
  //       alignItems="flex-start"
  //       sx={{ maxWidth: "1200px", width: "100%" }}
  //     >
  //       {/* Image Section */}
  //       <Grid item sx={{ width: "30%" }}>
  //         <Stack
  //           spacing={2}
  //           alignItems="center"
  //           sx={{
  //             border: "1px solid #e2e8f0",
  //             borderRadius: 2,
  //             p: 3,
  //             bgcolor: "#fff",
  //             // boxShadow: 1,
  //           }}
  //         >
  //           {/* Image Preview */}
  //           <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
  //             <Avatar
  //               variant="rounded"
  //               src={imageUrl}
  //               alt="Product Image"
  //               sx={{
  //                 width: 140,
  //                 height: 140,
  //                 mb: 1,
  //                 border: "2px solid #e0e0e0",
  //                 transition: "0.3s",
  //                 "&:hover": { opacity: 0.8 },
  //               }}
  //             />
  //           </label>

  //           <input
  //             type="file"
  //             id="upload-image"
  //             hidden
  //             onChange={handleImageChange}
  //             ref={fileInputRef}
  //             accept="image/*"
  //           />

  //           {/* Product Name */}
  //           <Typography
  //             fontWeight={600}
  //             fontSize="1.2rem"
  //             textAlign="center"
  //           >
  //             {productData.productName || "Product Image"}
  //           </Typography>
  //           <Typography
  //             variant="body2"
  //             color="text.secondary"
  //             textAlign="center"
  //           >
  //             Click image or use buttons to upload
  //           </Typography>

  //           <Divider
  //             sx={{
  //               width: "100%",
  //               my: 2,
  //               borderColor: "#e2e8f0",
  //               borderBottomWidth: "2px",
  //             }}
  //           />

  //           {/* Action Buttons */}
  //           <Stack direction="row" spacing={2}>
  //             <Button
  //               variant="outlined"
  //               onClick={() => fileInputRef.current?.click()}
  //               sx={{
  //                 textTransform: "none",
  //                 fontWeight: 500,
  //               }}
  //             >
  //               Choose Image
  //             </Button>
  //             <Button
  //               variant="contained"
  //               onClick={handleUploadToCloudinary} // your upload handler
  //               disabled={!selectedFile}
  //               sx={{
  //                 textTransform: "none",
  //                 fontWeight: 500,
  //               }}
  //             >
  //               Upload Image
  //             </Button>
  //           </Stack>
  //         </Stack>
  //       </Grid>

  //       {/* Form Section */}
  //       <Grid item xs={12} md={12} sx={{ width: "60%" }}>
  //         <Box
  //           sx={{
  //             border: "1px solid #e2e8f0",
  //             borderRadius: "10px",
  //             p: 3,
  //             backgroundColor: "#fff",
  //           }}
  //         >
  //           <Typography variant="h6" fontWeight={700} mb={2}>
  //             Edit Product Details
  //           </Typography>

  //           <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

  //           <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
  //             <TextField
  //               fullWidth
  //               label="Product Name"
  //               name="productName"
  //               value={productData.productName}
  //               onChange={handleChange}
  //               error={!!errors.productName}
  //               helperText={errors.productName}
  //             />
  //           </Box>

  //           <TextField
  //             fullWidth
  //             label="Description"
  //             name="description"
  //             multiline
  //             rows={2}
  //             value={productData.description}
  //             onChange={handleChange}
  //             error={!!errors.description}
  //             helperText={errors.description}
  //             sx={{ mb: 2 }}
  //           />

  //           <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
  //             <TextField
  //               //   select
  //               fullWidth
  //               label="Category"
  //               name="category"
  //               value={productData.category}
  //               onChange={handleChange}
  //               error={!!errors.category}
  //               helperText={errors.category}
  //             />

  //             <TextField
  //               fullWidth
  //               label="Collection"
  //               name="collection"
  //               value={productData.collection}
  //               onChange={handleChange}
  //               error={!!errors.collection}
  //               helperText={errors.collection}
  //             />
  //           </Box>

  //           <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />
  //         </Box>
  //       </Grid>

  //       {/* add variant box */}
  //       <Box
  //         sx={{
  //           mt: 4,
  //           p: 3,
  //           border: "1px solid #e0e0e0",
  //           borderRadius: 2,
  //           backgroundColor: "#fafafa",
  //           width: "100%",
  //         }}
  //       >
  //         <Box
  //           mb={2}
  //           display="flex"
  //           alignItems="center"
  //           justifyContent="space-between"
  //           flexWrap="wrap"
  //         >
  //           <Typography variant="h6" gutterBottom>
  //             Add Variant
  //           </Typography>
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             size="small"
  //             onClick={handleAddVariantBox}
  //             startIcon={<AddCircleIcon />}
  //             sx={{
  //               textTransform: "none",
  //               // backgroundColor: "#4caf50",
  //               // ":hover": { backgroundColor: "#388e3c" },
  //             }}
  //           >
  //             Add More Variant
  //           </Button>
  //         </Box>

  //         <AnimatePresence>
  //           {variants.map((variant, index) => (
  //             <motion.div
  //               key={index}
  //               initial={{ opacity: 0, scale: 0.95, y: -10 }}
  //               animate={{ opacity: 1, scale: 1, y: 0 }}
  //               exit={{ opacity: 0, scale: 0.95, y: -10 }}
  //               transition={{ duration: 0.3 }}
  //             >
  //               <Stack spacing={2} mb={4} component={Box}>
  //                 {index !== 0 && (
  //                   <Box sx={{ textAlign: "end" }}>
  //                     <IconButton
  //                       color="primary"
  //                       onClick={() => handleRemoveVariant(index)}
  //                     >
  //                       <ClearIcon />
  //                     </IconButton>
  //                   </Box>
  //                 )}
  //                 <TextField
  //                   fullWidth
  //                   label="Variant Name"
  //                   name="variantName"
  //                   value={variant.variantName}
  //                   onChange={(e) => handleVariantChange(index, e)}
  //                 />
  //                 <TextField
  //                   fullWidth
  //                   label="Variant Description"
  //                   name="description"
  //                   value={variant.description}
  //                   onChange={(e) => handleVariantChange(index, e)}
  //                 />
  //                 <Stack direction="row" spacing={2}>
  //                   <TextField
  //                     fullWidth
  //                     label="Stock"
  //                     name="stock"
  //                     type="number"
  //                     value={variant.stock}
  //                     onChange={(e) => handleVariantChange(index, e)}
  //                   />
  //                   <TextField
  //                     fullWidth
  //                     label="Price (₹)"
  //                     name="price"
  //                     value={variant.price}
  //                     onChange={(e) => handleVariantChange(index, e)}
  //                   />
  //                 </Stack>
  //               </Stack>
  //             </motion.div>
  //           ))}
  //         </AnimatePresence>
  //         <Button
  //           type="submit"
  //           variant="contained"
  //           color="primary"
  //           sx={{
  //             textTransform: "none",
  //             borderRadius: "8px",
  //             p: "10px 20px",
  //           }}
  //           // onClick={() => {
  //           //   router.push(`/admin/products/product-details/${id}`);
  //           // }}
  //         >
  //           Save Product
  //         </Button>
  //       </Box>
  //     </Grid>
  //   </Box>
  // </>
  //   </Box>
  // );

  return (
    <Box sx={{ p: 4 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={48} color="primary" />
        </Box>
      ) : (
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
                router.push(`/admin/products/product-details/${id}`);
              }}
            >
              Back
            </Button>
          </Box>

          {/* add product text */}
          <Typography variant="h4" mb={4} fontSize="30px">
            Update Product
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
                      alt="Product Image"
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
                    {productData.productName || "Product Image"}
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
                    Edit Product Details
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
                      //   select
                      fullWidth
                      label="Category"
                      name="category"
                      value={productData.category}
                      onChange={handleChange}
                      error={!!errors.category}
                      helperText={errors.category}
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

                  <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />
                </Box>
              </Grid>

              {/* add variant box */}
              <Box
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
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    p: "10px 20px",
                  }}
                  // onClick={() => {
                  //   router.push(`/admin/products/product-details/${id}`);
                  // }}
                >
                  Save Product
                </Button>
              </Box>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}

export default updateProduct;
