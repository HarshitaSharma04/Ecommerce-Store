"use client";
import { useParams } from "next/navigation";
import { Typography, Box } from "@mui/material";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <Box p={4}>
      <Typography gutterBottom>Collection details</Typography>
    </Box>
  );
}
