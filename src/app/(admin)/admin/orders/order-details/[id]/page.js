"use client";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

function OrderDetailPage() {
  const { id } = useParams();
  return (
    <Box p={4}>
      <Typography gutterBottom>order Details - {id}</Typography>
    </Box>
  );
}

export default OrderDetailPage;
