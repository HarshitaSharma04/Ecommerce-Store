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
import React, { useEffect, useState } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import "nprogress/nprogress.css";

function AdminNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  // if (!user) {
  //   return (
  //     <Box sx={{ px: 2, py: 1 }}>
  //       <Typography color="error">
  //         User not found or not authenticated.
  //       </Typography>
  //     </Box>
  //   );
  // }

  useEffect(() => {
    console.log("Redux User:", user);
  }, [user]);

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
            src={user?.avatar || "/default_profile_image.jpg"}
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
              {`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
                "Your Name"}
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              {user?.email || "you@example.com"}
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
