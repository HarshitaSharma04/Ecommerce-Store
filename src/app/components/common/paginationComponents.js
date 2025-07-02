"use client";
import { Button, Pagination, Stack } from "@mui/material";
import React from "react";

function PaginationComponents({totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      mt={3}
      flexWrap="wrap"
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          variant={currentPage === index + 1 ? "contained" : "outlined"}
          color="primary"
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  );
}

export default PaginationComponents;
