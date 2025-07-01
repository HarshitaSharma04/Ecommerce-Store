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

import { dummyCustomers } from "../../../../data/admin-dummy-data/customer-data";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

function Customers() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedCustomers = dummyCustomers.slice(
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
            Customers
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
                <TableCell>Signed Up</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow
                key={customer.id}
                  hover
                  onClick={() => {
                    router.push(`/admin/customers/customer-detail/${customer.id}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={customer.avatar} />
                      <Typography variant="subtitle2">{customer.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {customer.address.city}, {customer.address.state},{" "}
                    {customer.address.country}
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {dayjs(customer.createdAt).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box m={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(dummyCustomers.length / rowsPerPage)}
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

export default Customers;
