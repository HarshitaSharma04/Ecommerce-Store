"use client";
import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ListAlt, LogoutOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { signOut } from "next-auth/react";

const drawerWidth = 260;

// Navigation items with children for Products
const navItems = [
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon sx={{ fontSize: 24, color: "#3f51b5" }} />,
  },
  {
    text: "My Orders",
    href: "/orders",
    icon: <ListAlt sx={{ fontSize: 24, color: "#009688" }} />,
  },
  {
    text: "Wishlist",
    href: "/wishlist",
    icon: <FavoriteIcon sx={{ fontSize: 24, color: "#e91e63" }} />,
  },
  {
    text: "Cart",
    href: "/carts",
    icon: <ShoppingCartIcon sx={{ fontSize: 28, color: "#4caf50" }} />,
  },
  {
    text: "Profile",
    href: "/profile",
    icon: <AccountCircleIcon sx={{ fontSize: 24, color: "#ff9800" }} />,
  },
  {
    text: "Logout",
    action: () => signOut({ callbackUrl: "/login" }),
    icon: <LogoutOutlined sx={{ fontSize: 24, color: "#ff0808" }} />,
  },
];

export default function ConsumerSidebarDrawer({ children, open, handleClose }) {
  const pathname = usePathname();
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClose={handleClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0f172a",
            color: "#cbd5e1",
            borderRight: "1px solid #1e293b",
          },
        }}
      >
        {/* Logo */}
        <Box
          component={Link}
          href="/"
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src="/logo.svg"
            alt="ShopSmart Logo"
            sx={{ width: 36, filter: "brightness(0) invert(1)" }}
          />
          <Typography fontSize={18} fontWeight="bold" color="white">
            ShopSmart
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#334155", mx: 2, my: 1 }} />

        {/* Navigation Items */}
        <List>
          {navItems.map(({ text, icon, href, action }) => {
            const isActive = pathname === href;
            const isChildActive = children?.some(
              (child) => pathname === child.href
            );

            return (
              <React.Fragment key={href}>
                {/* Parent Item */}
                <ListItem disablePadding>
                  {href ? (
                    <Link
                      href={href}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                      }}
                    >
                      <ListItemButton
                        onClick={handleClose}
                        sx={{
                          px: 3,
                          py: 1.2,
                          color: isActive || isChildActive ? "#fff" : "#cbd5e1",
                          backgroundColor:
                            isActive || isChildActive
                              ? "#1e293b"
                              : "transparent",
                          "&:hover": {
                            backgroundColor: "#1e293b",
                            color: "#fff",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color:
                              isActive || isChildActive ? "#38bdf8" : "#94a3b8",
                            minWidth: "36px",
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight:
                              isActive || isChildActive ? "bold" : "normal",
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  ) : (
                    <ListItemButton
                      onClick={action}
                      sx={{
                        px: 3,
                        py: 1.2,
                        color: isActive || isChildActive ? "#fff" : "#cbd5e1",
                        backgroundColor:
                          isActive || isChildActive ? "#1e293b" : "transparent",
                        "&:hover": {
                          backgroundColor: "#1e293b",
                          color: "#fff",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            isActive || isChildActive ? "#38bdf8" : "#94a3b8",
                          minWidth: "36px",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: 15,
                          fontWeight:
                            isActive || isChildActive ? "bold" : "normal",
                        }}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>

      {/* Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
