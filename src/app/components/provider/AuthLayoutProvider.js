"use client";

import { Box, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AuthLayoutProvider({ children }) {
  const pathname = usePathname(); // Needed to animate on route change

  return (
    <Box
      // component={Link}
      // href="/"
      sx={{
        display: { xs: "flex", lg: "grid" },
        flexDirection: "column",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left Section */}
      <Box sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
        {/* Logo */}
        <Box
        component={Link}
        href="/"
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Box component="img" alt="logo" src="/logo.svg" />
          <Typography fontWeight="bold" fontSize="18px" color="#192c4b">
            ShopSmart
          </Typography>
        </Box>

        {/* Animated Children */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 3 },
            position: "relative", // needed for animation stacking
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname} // This ensures a new animation on each route
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                maxWidth: "450px",
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          alignItems: "center",
          background:
            "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
          color: "white",
          display: { xs: "none", lg: "flex" },
          justifyContent: "center",
          p: 3,
          flexDirection: "column",
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography
              color="inherit"
              sx={{ fontSize: "28px", textAlign: "center" }}
              variant="h1"
            >
              Welcome to{" "}
              <Box component="span" sx={{ color: "#15b79e" }}>
                ShopSmart
              </Box>
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              sx={{ fontSize: "18px" }}
            >
              A professional template with ready-to-use MUI components.
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              alt="Widgets"
              src="/widgets.png"
              sx={{ width: "100%", maxWidth: "600px", height: "auto" }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
