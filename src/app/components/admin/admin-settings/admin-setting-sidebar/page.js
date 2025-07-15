"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsLinks = [
  { text: "Profile", href: "/admin/settings/account-setting" },
  { text: "Security", href: "/admin/settings/password-setting" },
  { text: "Billing", href: "/admin/settings/billing" },
  { text: "Notifications", href: "/admin/settings/notifications" },
];

const drawerWidth = 250;

export default function AdminSettingSidebar({ children }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Second Sidebar (Settings only) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f1f5f9",
            borderRight: "1px solid #ccc",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Settings
          </Typography>
          <List>
            {settingsLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    selected={isActive}
                  >
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* Settings Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
