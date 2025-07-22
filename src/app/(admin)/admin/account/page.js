"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getSession } from "next-auth/react";

function Account() {
  const defaultUserData = {
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    gender: "",
    address: "",
    avatar: "",
  };

  const [AccountData, setAccountData] = useState(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users");
        const result = await res.json();
        console.log("result : ", result);
        if (res.ok && result) {
          setAccountData({
            ...defaultUserData,
            ...Object.fromEntries(
              Object.entries(result).map(([key, val]) => [key, val ?? ""])
            ),
          });
        } else {
          console.log("failed to fetch data");
        }
      } catch (error) {
        console.log("error : ", error.message);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const session = await getSession();
  //       const token = session?.accessToken;

  //       if (!token) {
  //         console.log("❌ No token available");
  //         return;
  //       }

  //       const res = await fetch("/api/users", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const result = await res.json();
  //       console.log("✅ result : ", result);

  //       if (res.ok && result) {
  //         setAccountData({
  //           ...defaultUserData,
  //           ...Object.fromEntries(
  //             Object.entries(result).map(([key, val]) => [key, val ?? ""])
  //           ),
  //         });
  //       } else {
  //         console.log("❌ Failed to fetch user data");
  //       }
  //     } catch (error) {
  //       console.log("❌ Error:", error.message);
  //     } finally {
  //       setTimeout(() => setLoading(false), 1500);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // const validate = () => {
  //   const newErrors = {};

  //   // firstname validation
  //   if (!AccountData.firstName) {
  //     newErrors.firstName = "First name is required";
  //   } else if (AccountData.firstName.length < 3) {
  //     newErrors.firstName = "Minimum 3 characters";
  //   } else if (AccountData.firstName.length > 10) {
  //     newErrors.firstName = "Maximum 15 characters";
  //   }

  //   // last name validation
  //   if (!AccountData.lastName) {
  //     newErrors.lastName = "last name is required";
  //   } else if (AccountData.lastName.length < 3) {
  //     newErrors.lastName = "Minimum 3 characters";
  //   } else if (AccountData.lastName.length > 10) {
  //     newErrors.lastName = "Maximum 15 characters";
  //   }
  //   // phone validation
  //   if (!AccountData.phone) newErrors.phone = "Required";

  //   // Email validation
  //   if (!AccountData.email) {
  //     newErrors.email = "Email is required";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(AccountData.email)) {
  //     newErrors.email = "Invalid email address";
  //   }

  //   // city validation
  //   if (!AccountData.city) newErrors.city = "Required";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Account Data Submitted:", AccountData);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <>
          <Container
            maxWidth="lg"
            sx={{
              minHeight: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={48} color="primary" />
          </Container>
        </>
      ) : (
        <>
          <Typography variant="h4" mb={4} fontSize="30px">
            Account
          </Typography>

          {/* <Box display="flex" > */}
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            sx={{ maxWidth: "1200px", width: "100%" }}
          >
            {/* Image Section */}
            <Grid item sx={{ width: "35%" }}>
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
                  variant="circle"
                  src={AccountData.avatar}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography fontWeight={500} fontSize="1.2rem">
                  {AccountData.firstName} {AccountData.lastName}
                </Typography>
                <Typography color="text.secondary">
                  {AccountData.contact}
                </Typography>
                <Typography color="text.secondary">
                  {AccountData.email}
                </Typography>

                {/* <Divider
                  sx={{
                    width: "100%",
                    mx: "auto",
                    my: 3,
                    borderColor: "#e2e8f0",
                    borderBottomWidth: "2px",
                  }}
                /> */}

                {/* <Button
                  variant="text"
                  sx={{
                    color: "#6366f1",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Upload Image
                </Button> */}
              </Stack>
            </Grid>

            {/* Form Section */}
            <Grid item xs={12} md={12} sx={{ width: "55%" }}>
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
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={AccountData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />

                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={AccountData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Contact"
                    name="contact"
                    value={AccountData.contact}
                    onChange={handleChange}
                    error={!!errors.contact}
                    helperText={errors.contact}
                  />

                  <TextField
                    fullWidth
                    label="email"
                    name="email"
                    value={AccountData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={AccountData.gender}
                    onChange={handleChange}
                    error={!!errors.gender}
                    helperText={errors.gender}
                  />

                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={AccountData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Box>

                <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

                {/* <Box textAlign="right">
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
            </Box> */}
              </Box>
            </Grid>
          </Grid>
          {/* </Box> */}
        </>
      )}
    </Box>
  );
}

export default Account;
