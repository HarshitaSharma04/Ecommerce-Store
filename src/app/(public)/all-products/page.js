"use client";
import { AllDummyProducts } from "@/data/admin-dummy-data/all-dummy-products";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Pagination,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function AllProducts() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const paginatedProducts = AllDummyProducts.slice(
    (page-1) * rowsPerPage,
    page * rowsPerPage 
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Box p={3}>
      <Typography variant="h4" textAlign="center" mb={4}>
        All Products
      </Typography>

      {/* ✅ Wrap all cards in one flex box */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {paginatedProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: 300,
              backgroundColor: "#f8fafa",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom color="#122647">
                {product.name}
              </Typography>
              <Typography color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 2,
                  color: "#15b79e",
                  borderColor: "#15b79e",
                  "&:hover": {
                    backgroundColor: "#e6f8f5",
                    borderColor: "#13a28c",
                  },
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ mt: 5 }} />

      {/* Pagination Buttons */}
      <Box mt={5} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(AllDummyProducts.length / rowsPerPage)}
          rowsperpage = {rowsPerPage}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

export default AllProducts;
