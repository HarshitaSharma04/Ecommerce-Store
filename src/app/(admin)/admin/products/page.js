"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  CircularProgress,
} from "@mui/material";

import {
  AddCircleRounded,
  CloudDownloadRounded,
  CloudUploadRounded,
  Delete,
  Search as SearchIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const paginatedProducts = products.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpen = (e, product) => {
    e.stopPropagation();
    setSelectedProductId(product.id);
    setSelectedProductName(product.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigateWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 1500);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const result = await res.json();
        console.log("result : ", result);
        if (result.success) {
          setProducts(result.data);
          console.log("products : ", result.data);
        } else {
          console.log("failed to fetch data");
        }
      } catch (error) {
        console.log("error : ", error.message);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    setTimeout(() => fetchProducts(), 0);
    fetchProducts();
  }, []);

  const stockCalculate = (variants) => {
    return variants.reduce(
      (sum, v) => sum + (typeof v.stock === "number" ? v.stock : 0),
      0
    );
  };

  const handleDelete = async (id) => {
    console.log("deleting product with id : ", id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "Delete",
      });
      const result = await res.json();
      if (res.ok && result?.message) {
        console.log("result of deleted product is : ", result);
        setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));
        setOpen(false);
        toast.success("Product Successfully Deleted", { duration: 3000 });
      } else {
        toast.error("Product Deletion Failed");
      }
    } catch (error) {
      console.log("error:", error.message);
      toast.error("Error deleting the product");
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={48} color="primary" />
      </Container>
    );
  }

  return (
    <>
      {/* Layout Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
        }}
      >
        {/* Header Section */}
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Products
          </Typography>
        </Box>

        {/* Import / Export Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUploadRounded />}
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            Import
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudDownloadRounded />}
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            Export
          </Button>
        </Box>

        {/* Search Input */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: "25px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // soft shadow
            border: "1px solid #e0e0e0", // optional light border
          }}
        >
          <OutlinedInput
            fullWidth
            placeholder="Search for products"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{
              maxWidth: "500px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              height: 40, // or 36 — set a fixed height
              fontSize: "14px", // slightly smaller text
              "& input": {
                padding: "8px 12px", // adjust input padding
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
                borderWidth: "2px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleRounded />}
            sx={{ textTransform: "none", borderRadius: "8px", p: "9px 15px" }}
            onClick={() => {
              handleNavigateWithLoading("/admin/products/add-product");
            }}
          >
            Add Products
          </Button>
        </Box>
      </Box>

      {/* Customer Table */}
      <Card sx={{ mt: 3, mx: 2 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Products</TableCell>
                <TableCell>sku</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Collection</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete {selectedProductName}{" "}
                    product
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose} color="inherit">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleDelete(selectedProductId)}
                    color="error"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              {paginatedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  onClick={() => {
                    handleNavigateWithLoading(
                      `/admin/products/product-details/${product.id}`
                    );
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    padding="checkbox"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={product.image || "/product_default_image.jpg"}
                      />
                      <Typography variant="subtitle2">
                        {product.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>All</TableCell>
                  <TableCell>
                    {stockCalculate(product.variant) ?? "N/A"}
                  </TableCell>
                  <TableCell>{`$${product.variant[0].price.toFixed(
                    2
                  )}`}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        color: "#fff",
                        backgroundColor:
                          product.status === "inactive"
                            ? "red"
                            : product.status === "active"
                            ? "green"
                            : product.status === "draft"
                            ? "orange"
                            : "inherit",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {product.status}
                    </Box>
                  </TableCell>

                  <TableCell>
                    {dayjs(product.createdAt).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={(e) => {
                        handleClickOpen(e, product);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* <Divider sx={{m:5}} /> */}
        <Box m={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(products.length / rowsPerPage)}
            page={page}
            rowsperpage={rowsPerPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Card>
    </>
  );
}

export default Products;
