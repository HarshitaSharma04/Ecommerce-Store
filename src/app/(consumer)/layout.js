// src/app/(consumer)/all-products/layout.js
"use client"
import React, { useState } from "react";
import ConsumerNavbar from "../components/consumer/consumerNavbar";
import ConsumerLayoutProvider from "../components/provider/ConsumerLayoutProvider";
import { Divider } from "@mui/material";

export default function AllProductsLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);
  return (
    // <>
    <ConsumerLayoutProvider open={drawerOpen} handleClose={closeDrawer}>
      <ConsumerNavbar onToggleDrawer={toggleDrawer} />
      <Divider sx={{ borderColor: "#39588433", my: 1 }} />
      {children}
    </ConsumerLayoutProvider>
    // </>
  );
}
