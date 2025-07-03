"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function ProfileData() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // firstname validation
    if (!profileData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (profileData.firstName.length < 3) {
      newErrors.firstName = "Minimum 3 characters";
    } else if (profileData.firstName.length > 10) {
      newErrors.firstName = "Maximum 15 characters";
    }

    // last name validation
    if (!profileData.lastName) {
      newErrors.lastName = "last name is required";
    } else if (profileData.lastName.length < 3) {
      newErrors.lastName = "Minimum 3 characters";
    } else if (profileData.lastName.length > 10) {
      newErrors.lastName = "Maximum 15 characters";
    }
    // phone validation
    if (!profileData.phone) newErrors.phone = "Required";

    // Email validation
    if (!profileData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "Invalid email address";
    }

    // city validation
    if (!profileData.city) newErrors.city = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Profile Data Submitted:", profileData);
    }
  };

  return (
    <Box sx={{ py: 5, px: 10 }} maxWidth={2100}>
      <Typography variant="h4" mb={4} fontSize="30px">
        My Profile
      </Typography>

      {/* <Box display="flex" > */}
      <Grid
        container
        // spacing={2}
        alignItems="flex-start"
        justifyContent="space-between"
        // sx={{ maxWidth: "1200px", width: "100%" }}
      >
        {/* Image Section */}
        <Grid item size={{ xs: 12, md: 4 }}>
          <Stack
            spacing={1}
            sx={{
              alignItems: "center",
              border: "1px solid #e2e8f0",
              borderRadius: "30px",
              p: 3,
              backgroundColor: "#fff",
            }}
          >
            <Avatar
              variant="rounded"
              src=""
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Typography fontWeight={700} fontSize="1.2rem">
              Name
            </Typography>
            <Typography color="text.secondary">Email</Typography>
            <Typography color="text.secondary">Location</Typography>

            <Divider
              sx={{
                width: "100%",
                mx: "auto",
                my: 3,
                borderColor: "#e2e8f0",
                borderBottomWidth: "2px",
              }}
            />

            <Button
              variant="text"
              sx={{
                color: "#6366f1",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Upload Image
            </Button>
          </Stack>
        </Grid>

        {/* Form Section */}
        <Grid item size={{ xs: 12, md: 7 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: "30px",
              p: 3,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2}>
              Profile
            </Typography>

            <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />

              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                required
                select
                fullWidth
                label="State"
                name="state"
                value={profileData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
              >
                {states.map((map) => (
                  <MenuItem key={map} value={map}>
                    {map.charAt(0).toUpperCase() + map.slice(1)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={profileData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Box>

            <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

            <Box textAlign="right">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#6366f1",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.3,
                  borderRadius: 2,
                  ":hover": { background: "#4f46e5" },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </Box> */}
    </Box>
  );
}

export default ProfileData;
