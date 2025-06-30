"use client";
import React, { useState } from "react";
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
} from "@mui/material";

import {
  AddCircleRounded,
  CloudDownloadRounded,
  CloudUploadRounded,
  Delete,
  Search as SearchIcon,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { dummyProducts } from "@/data/products-data";
import { DeviceTabletCameraIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

function Products() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const paginatedProducts = dummyProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
              router.push("/admin/products/add-product");
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
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  onClick={() => {
                    router.push(
                      `/admin/products/product-details/${product.id}`
                    );
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={product.image} />
                      <Typography variant="subtitle2">
                        {product.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.collection}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {dayjs(product.createdAt).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={(e) => {
                        e.stopPropagation();
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
            count={Math.ceil(dummyProducts.length / rowsPerPage)}
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
