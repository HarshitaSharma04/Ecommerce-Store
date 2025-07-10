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
  Container,
  CircularProgress,
} from "@mui/material";

import {
  AddCircleRounded,
  CloudDownloadRounded,
  CloudUploadRounded,
  Delete,
  Edit,
  Search as SearchIcon,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { DummyCategories } from "@/data/admin-dummy-data/categories-data";
import { useRouter } from "next/navigation";

function Categories() {
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  // loader
  const [loading, setLoading] = useState(true);

  const paginatedCategories = category.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // fetch product categories
  useEffect(() => {
    const fetchCategories = async (id) => {
      try {
        const res = await fetch("/api/admin/categories");
        const result = await res.json();
        console.log("result : ", result);
        if (res.ok && result.success) {
          setCategory(result.data);
          console.log("categories : ", result.data);
        } else {
          console.log(
            "failed to fetch category",
            result.error || result.message
          );
        }
      } catch (error) {
        console.log("error : ", error.message);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchCategories();
  }, []);

  const handleNavigateWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 1500);
  };

  return (
    <Box>
      {loading ? (
        <>
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
        </>
      ) : (
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
                Categories
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
                placeholder="Search for Categories"
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
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  p: "9px 15px",
                }}
                onClick={() => {
                  handleNavigateWithLoading(
                    "/admin/products/categories/add-categories"
                  );
                }}
              >
                Add Categories
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
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Total Products</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCategories.map((category) => (
                    <TableRow
                      key={category.id}
                      hover
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={
                              category?.image &&
                              category.image.startsWith("http")
                                ? category.image
                                : "/product_default_image.jpg"
                            }
                          />
                          <Typography variant="subtitle2">
                            {category.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>{category.totalProducts}</TableCell>
                      {/* <TableCell>${row.price.toFixed(2)}</TableCell> */}
                      <TableCell>
                        {dayjs(category.createdAt).format("MMM D, YYYY")}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ color: "4caf50" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigateWithLoading(`/admin/products/categories/update-category/${category.id}`)
                          }}
                        >
                          <Edit />
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
                count={Math.ceil(DummyCategories.length / rowsPerPage)}
                page={page}
                rowsperpage={rowsPerPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          </Card>
        </>
      )}
    </Box>
  );
}

export default Categories;
