// src/app/(consumer)/layout.js
"use client";
import React, { useState } from "react";
import ConsumerNavbar from "../components/consumer/consumerNavbar";
import ConsumerLayoutProvider from "../components/provider/ConsumerLayoutProvider";
import { Divider } from "@mui/material";
import Footer from "../components/footer";
import CartSyncer from "../components/consumer/cartsyncer";

export default function AllProductsLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSyncDone, setIsSyncDone] = useState(false); 

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);
  return (
    // <>
    <ConsumerLayoutProvider open={drawerOpen} handleClose={closeDrawer}>
    <CartSyncer />
      <ConsumerNavbar onToggleDrawer={toggleDrawer} />
      {children}
      <Footer />
    </ConsumerLayoutProvider>
    // </>
  );
}
