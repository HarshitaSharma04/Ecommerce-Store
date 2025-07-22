"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import toast from "react-hot-toast";

function PasswordSetting() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: "",
    confirmPassword: "",
  });

  const toggleVisibility = (key) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const { newPassword, confirmPassword } = formData;

    if (!isStrongPassword(newPassword)) {
      newErrors.newPassword =
        "Must include uppercase, lowercase, digit, special char, min 6 chars";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("Form submitted:", formData);

        const res = await fetch("/api/users/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          }),
        });

        const result = await res.json();
        console.log("result from server is:", result);

        if (res.ok && result.success) {
          console.log("Password updated successfully");
          toast.success("Password updated successfully");
        } else {
          console.log("Something Went Wrong");
          toast.error(result?.error || "Password update failed");
        }
      } catch (err) {
        console.error("Error updating password:", err);
        toast.error("Something went wrong. Please try again.");
      }
    }
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
            <Paper
              elevation={3}
              sx={{ p: 4 }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom mb={4}>
                Password Setting
              </Typography>

              <Box display="flex" flexDirection="column" gap={3}>
                {/* Old Password (optional toggle) */}
                <TextField
                  sx={textFieldStyle}
                  label="Old Password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  type={showPassword.oldPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => toggleVisibility("oldPassword")}
                        edge="end"
                      >
                        {showPassword.oldPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                {/* New Password */}
                <TextField
                  sx={textFieldStyle}
                  label="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  type={showPassword.newPassword ? "text" : "password"}
                  error={Boolean(errors.newPassword)}
                  helperText={errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => toggleVisibility("newPassword")}
                        edge="end"
                      >
                        {showPassword.newPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                {/* Confirm Password */}
                <TextField
                  sx={textFieldStyle}
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showPassword.confirmPassword ? "text" : "password"}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => toggleVisibility("confirmPassword")}
                        edge="end"
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box display="flex" justifyContent="flex-start" gap={2} mt={4}>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default PasswordSetting;
