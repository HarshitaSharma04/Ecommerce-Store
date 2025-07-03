"use client";

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  GearSix,
  SignOut,
  User,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function AdminNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    handleClose();
    router.push(path);
  };

  return (
    <Box
      component="header"
      sx={{
        borderBottom: "1px solid var(--mui-palette-divider)",
        backgroundColor: "var(--mui-palette-background-paper)",
        position: "sticky",
        top: 0,
        zIndex: "var(--mui-zIndex-appBar)",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "64px",
          px: 2,
        }}
      >
        {/* Left */}
        <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
          <Tooltip title="Search">
            <IconButton>
              <MagnifyingGlassIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Right */}
        <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
          <Tooltip title="Contacts">
            <IconButton>
              <UsersIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <Badge badgeContent={4} color="success" variant="dot">
              <IconButton>
                <BellIcon />
              </IconButton>
            </Badge>
          </Tooltip>
          <Avatar
            onClick={handleAvatarClick}
            // src="/assets/avatar.png"
            sx={{ cursor: "pointer" }}
          />
        </Stack>

        {/* Popover Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 4,
            sx: {
              width: 220,
              mt: 1,
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* User Info Section */}
          <Box
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography fontWeight="bold" fontSize={14}>
              Harshita Sharma
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              example@gmail.com
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "#334155", my: 1 }} />

          {/* Menu Items */}
          <MenuItem onClick={() => handleMenuClick("/admin/account")}>
            <Box display="flex" alignItems="center" gap={1}>
              <User size={18} />
              <Typography variant="inherit">Profile</Typography>
            </Box>
          </MenuItem>

          <MenuItem onClick={() => handleMenuClick("/admin/settings")}>
            <Box display="flex" alignItems="center" gap={1}>
              <GearSix size={18} />
              <Typography variant="inherit">Settings</Typography>
            </Box>
          </MenuItem>

          <MenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            <Box display="flex" alignItems="center" gap={1}>
              <SignOut size={18} />
              <Typography variant="inherit">Sign Out</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}

export default AdminNav;
