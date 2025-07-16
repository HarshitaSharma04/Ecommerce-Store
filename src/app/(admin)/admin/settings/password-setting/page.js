"use client";
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import React, { useState, useRef } from "react";

function PasswordSetting() {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const textFieldStyle = {
    width: "300px",
    "& .MuiInputBase-root": {
      height: 45,
      alignItems: "center",
    },
    "& .MuiInputLabel-root": {
      top: -5,
    },
  };

  const handleSubmit = ()=>{
    console.log("form submitted: ", formData)
  }

  return (
    <Box
      sx={{ py: 5, minHeight: "100vh", backgroundColor: "background.default" }}
    >
      <Container maxWidth="md">
        
        <Paper elevation={3} sx={{ p: 4 }}  component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" fontWeight={600} gutterBottom mb={4}>
          Password Setting
        </Typography>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              sx={textFieldStyle}
              label="Old Password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <TextField
              sx={textFieldStyle}
              label="New Passsword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <TextField
              sx={textFieldStyle}
              label="Confirm Passsword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Box>

          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-start" gap={2} mt={4}>
            <Button variant="outlined" color="secondary">
              Discard
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PasswordSetting;
