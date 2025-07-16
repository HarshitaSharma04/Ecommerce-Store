"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Container,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const cartCount = 3; // Replace with Redux/context in production
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        background:
          "linear-gradient(135deg, #15b79e 0%, #b5c0d2 40%, #122647 100%)",
        color: "#d2f5ee",
        py: 1,
      }}
    >
      <Container maxWidth="1500">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.svg"
              alt="ShopSmart Logo"
              width={60}
              height={60}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#192c4b", ml: 1 }}
            >
              ShopSmart
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {/* <Button component={Link} href="/" sx={{ color: "#b5c0d2" }}>
              Home
            </Button> */}
            <Button component={Link} href="/all-products" sx={{ color: "#b5c0d2" }}>
              Products
            </Button>
            <Button
              component={Link}
              href="/categories"
              sx={{ color: "#b5c0d2" }}
            >
              Categories
            </Button>
            {/* <Button component={Link} href="/admin" sx={{ color: "#b5c0d2" }}>
              Admin
            </Button>
            <Button component={Link} href="/profile" sx={{ color: "#b5c0d2" }}>
              Customer
            </Button> */}
            <Button component={Link} href="/login" sx={{ color: "#b5c0d2" }}>
              Login
            </Button>
            {/* <Button component={Link} href="/signUp" sx={{ color: "black" }}>
              Signup
            </Button> */}
            <IconButton component={Link} href="/carts" sx={{ color: "#b5c0d2" }}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMenuOpen} sx={{ color: "black" }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} href="/">
                Home
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                href="/products"
              >
                Products
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                href="/categories"
              >
                Categories
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href="/cart">
                Cart
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                href="/login"
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                href="/signup"
              >
                Signup
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
