"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    console.log("signUp data:", data);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let result;
      try {
        result = await res.json();
      } catch (err) {
        console.log("JSON parsing failed", err);
      }

      if (res.ok) {
        console.log("Signup success:", result);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        console.log(
          "Signup failed:",
          result?.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant="h4">Sign Up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#192c4b" }}>
            Sign in
          </Link>
        </Typography>
      </Stack>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          required
          {...register("firstName", {
            required: "First Name is required",
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        {/* Last Name */}
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          required
          {...register("lastName", {
            required: "Last Name is required",
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password with Eye Icon */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          required
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/,
              message: "Must include upper, lower, and special character",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? (
                    <EyeSlashIcon fontSize={20} />
                  ) : (
                    <EyeIcon fontSize={20} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          select
          label="Role"
          margin="normal"
          defaultValue="customer"
          {...register("role", { required: "Role is required" })}
          error={!!errors.role}
          helperText={errors.role?.message}
        >
          <MenuItem value="admin">Add as a Admin</MenuItem>
          <MenuItem value="customer">Add as a Customer</MenuItem>
        </TextField>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          // sx={{ mt: 2, py: 1, color: "white" }}
          sx={{
            background:
              "linear-gradient(135deg, #122647 10%, #15b79e 40%, #122647 90%)",
            color: "white",
          }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}
