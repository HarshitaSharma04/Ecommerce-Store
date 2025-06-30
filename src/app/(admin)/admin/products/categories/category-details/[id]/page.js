"use client"
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

function CategoryDetails() {
  const { id } = useParams();
  return (
    <Box p={4}>
      <Typography gutterBottom>product category details - {id}</Typography>
    </Box>
  );
}

export default CategoryDetails;
