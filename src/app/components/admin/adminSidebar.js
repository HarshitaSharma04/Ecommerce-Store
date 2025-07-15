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

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import CompareArrowsOutlined from "@mui/icons-material/CompareArrowsOutlined";
import SecurityIcon from '@mui/icons-material/Security';

const drawerWidth = 300;

// Navigation items with children for Products
const navItems = [
  {
    text: "Overview",
    href: "/admin",
    icon: <DashboardIcon sx={{ color: "#3f51b5", fontSize: "25px" }} />,
  },
  {
    text: "Products",
    href: "/admin/products",
    icon: <Inventory2Icon sx={{ color: "#009688", fontSize: "25px" }} />,
    children: [
      {
        text: "Categories",
        href: "/admin/products/categories",
        icon: <CategoryIcon sx={{ color: "#ff9800", fontSize: "20px" }} />,
      },
    ],
  },
  {
    text: "Customers",
    href: "/admin/customers",
    icon: <GroupIcon sx={{ color: "#00bcd4", fontSize: "25px" }} />,
  },
  {
    text: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCartIcon sx={{ color: "#4caf50", fontSize: "25px" }} />,
  },
  {
    text: "Transaction",
    href: "/admin/transactions",
    icon: <CompareArrowsOutlined sx={{ color: "#607d8b", fontSize: "25px" }} />,
  },
  {
    text: "Account",
    href: "/admin/account",
    icon: <AccountCircleIcon sx={{ color: "#f44336", fontSize: "25px" }} />,
  },
  {
    text: "Settings",
    href: "/admin/settings",
    icon: <SettingsIcon sx={{ color: "#795548", fontSize: "25px" }} />,
    children: [
      {
        text: "My Profile",
        href: "/admin/settings/account-setting",
        icon: <AccountCircleIcon sx={{ color: "#e211c6ff", fontSize: "20px" }} />,
      },
      {
        text: "Security",
        href: "/admin/settings/password-setting",
        icon: <SecurityIcon sx={{ color: "#269496ffff", fontSize: "20px" }} />,
      },
    ],
  },
];

export default function AdminSidebar({ children }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
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
          {navItems.map(({ text, href, icon, children }) => {
            const isActive = pathname === href;
            const isChildActive = children?.some(
              (child) => pathname === child.href
            );

            return (
              <React.Fragment key={href}>
                {/* Parent Item */}
                <ListItem disablePadding>
                  <Link
                    href={href}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
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
                  </Link>
                </ListItem>

                {/* Child Items */}
                {children?.map((child) => {
                  const isChildSelected = pathname === child.href;
                  return (
                    <ListItem key={child.href} disablePadding sx={{ pl: 4 }}>
                      <Link
                        href={child.href}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                        }}
                      >
                        <ListItemButton
                          sx={{
                            px: 3,
                            py: 1,
                            color: isChildSelected ? "#fff" : "#cbd5e1",
                            backgroundColor: isChildSelected
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
                              color: isChildSelected ? "#38bdf8" : "#94a3b8",
                              minWidth: "36px",
                            }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.text}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: isChildSelected ? "bold" : "normal",
                            }}
                          />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  );
                })}
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
          p: 3,
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
