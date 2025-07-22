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
  CircularProgress,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { setUser } from "@/app/store/authSlice";
import { useDispatch } from "react-redux";

function AccountSetting() {
  const dispatch = useDispatch();
  const defaultUserData = {
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    gender: "",
    address: "",
    avatar: "",
  };

  const [userData, setuserData] = useState(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("/default_profile_image.jpg");
  const fileInputRef = useRef();
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target?.files[0];
    if (file) {
      setSelectedFile(file);
      const newImageUrl = URL.createObjectURL(file);
      setAvatar(newImageUrl);
      setuserData((prev) => ({ ...prev, avatar: newImageUrl }));
    }
  };

  // handle save avatar
  const handleSaveAvatar = async () => {
    console.log("save image ..........");
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log("image :", formData);
    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Cloudinary Upload URL:", data.url);
      if (res.ok && data?.url) {
        console.log("✅ Image uploaded successfully:", data.url);
        setAvatar(data.url); 
        setuserData((prev) => ({ ...prev, avatar: data.url }));
        dispatch(setUser({ avatar: data.url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data?.error || "Image upload failed");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  // handle delete avatar
  const handleDeleteAvatar = () => {
    setAvatar(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  //   validation
  const validate = () => {
    const newErrors = {};

    if (!userData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (userData.firstName.trim().length < 3) {
      newErrors.firstName = "Please enter at least 3 characters";
    } else if (/^\d+$/.test(userData.firstName)) {
      newErrors.firstName = "Name cannot be numbers";
    }

    if (!userData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (userData.lastName.trim().length < 3) {
      newErrors.lastName = "Please enter at least 3 characters";
    } else if (/^\d+$/.test(userData.lastName)) {
      newErrors.lastName = "Name cannot be numbers";
    }

    if (!userData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    }
    // else if (!/^\d+$/.test(userData.contact.trim())) {
    //   newErrors.contact =
    //     "Only numbers are allowed — no letters or special characters";
    // } else if (userData.contact.trim().length !== 10) {
    //   newErrors.contact = "Contact number must be 10 digits";
    // }

    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!userData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({}); // clear previous errors on success
    return true;
  };

  //   Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Update Information:", userData);
    } else {
      console.log("Validation failed");
    }
    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("contact", userData.contact);
      formData.append("email", userData.email);
      formData.append("address", userData.address);
      formData.append("avatar", userData.avatar);

      console.log("Form data to be submitted:", formData);

      const res = await fetch("/api/users/update", {
        method: "PUT",
        body: formData,
      });
      const result = await res.json();
      console.log("response from server:", result);
      if (res.ok && result.success) {
        console.log("Update Successfully:", result);
        dispatch(setUser(userData));
        toast.success("Update Successfully");
      } else {
        console.log("updateion failed");
        toast.error("Updation Failed");
      }
    } catch (error) {
      console.log("error :", error.message);
    }
  };

  //   handle Discard
  const handleDiscard = () => {
    setuserData({
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      gender: "",
      address: "",
    });
    setAvatar(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users");
        const result = await res.json();
        console.log("result : ", result);
        if (res.ok && result) {
          const cleanedData = {
            ...defaultUserData,
            ...Object.fromEntries(
              Object.entries(result).map(([key, val]) => [key, val ?? ""])
            ),
          };
          setuserData(cleanedData);
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

  return (
    <Box>
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
        <Box
          sx={{
            py: 5,
            minHeight: "100vh",
            backgroundColor: "background.default",
          }}
        >
          <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom mb={3}>
                My Profile
              </Typography>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={3}
                onSubmit={handleSubmit}
              >
                {/* Avatar Section */}
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box position="relative">
                    <Avatar
                      src={userData.avatar}
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        border: "2px solid #ccc",
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 100,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                    />
                  </Box>

                  <Stack direction="row" spacing={2} mt={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={handleSaveAvatar}
                      disabled={!avatar}
                    >
                      Save Image
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={handleDeleteAvatar}
                      disabled={!avatar}
                    >
                      Delete Image
                    </Button>
                  </Stack>
                </Box>

                {/* Form Fields */}
                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Contact"
                    name="contact"
                    type="tel"
                    value={userData.contact}
                    onChange={handleChange}
                    error={!!errors.contact}
                    helperText={errors.contact}
                  />
                </Box>

                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled
                  />
                  <TextField
                    required
                    select
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Box>

                <TextField
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  error={!!errors.address}
                  helperText={errors.address}
                />

                {/* Action Buttons */}
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDiscard}
                  >
                    Discard
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default AccountSetting;
