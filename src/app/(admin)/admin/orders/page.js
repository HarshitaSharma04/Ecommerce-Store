"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Pagination,
} from "@mui/material";

import {
  AddCircleRounded,
  CloudDownloadRounded,
  CloudUploadRounded,
  Delete,
  Search as SearchIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DummyOrders } from "@/data/dummy-orders";

export default function Orders() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedCustomers = DummyOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  return (
    <>
      {/* Layout Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Orders
          </Typography>
        </Box>

        {/* Import / Export Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUploadRounded />}
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            Import
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudDownloadRounded />}
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            Export
          </Button>
        </Box>

        {/* Search Input */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: "25px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // soft shadow
            border: "1px solid #e0e0e0", // optional light border
          }}
        >
          <OutlinedInput
            fullWidth
            placeholder="Search Customer"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{
              maxWidth: "500px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              height: 40, // or 36 — set a fixed height
              fontSize: "14px", // slightly smaller text
              "& input": {
                padding: "8px 12px", // adjust input padding
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
                borderWidth: "2px",
              },
            }}
          />
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleRounded />}
            sx={{ textTransform: "none", borderRadius: "8px", p: "9px 15px" }}
            // onClick={() => {
            //   router.push("/admin/customers/add-customer");
            // }}
          >
            Add Customer
          </Button> */}
        </Box>
      </Box>

      {/* Customer Table */}
      <Card sx={{ mt: 3, mx: 2 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Signed Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((order) => (
                <TableRow
                key={order.id}
                  hover
                  onClick={() => {
                    router.push(`/admin/orders/order-details/${order.id}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={order.avatar} />
                      <Typography variant="subtitle2">
                        {order.customer}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.itemsCount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {dayjs(order.createdAt).format("MMM D, YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box m={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(DummyOrders.length / rowsPerPage)}
            page={page}
            rowsperpage={rowsPerPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Card>
    </>
  );
}
