"use client";

import { Box, Button, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={2}
      bgcolor="#fdf2f2"
    >
      <WarningAmberIcon sx={{ fontSize: 80, color: "#d32f2f", mb: 2 }} />
      <Typography variant="h4" gutterBottom color="error">
        Access Denied
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        You do not have permission to view this page.
      </Typography>
      <Button
        component={Link}
        href="/"
        variant="contained"
        sx={{
          background: "linear-gradient(135deg, #122647, #15b79e)",
          color: "#fff",
          px: 4,
          py: 1.5,
          borderRadius: 3,
          textTransform: "none",
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
}
