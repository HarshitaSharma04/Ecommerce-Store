"use client";

import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  FormHelperText,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/authSlice";

export default function LoginPage() {
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setAuthError("");
    console.log("Login Data:", data);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      const session = await getSession();
      console.log("session:", session);

      const user = session?.user;

      if (!user) {
        setAuthError("Invalid session.");
        return;
      }

      // ✅ Set user to Redux
      dispatch(setUser(user));

      const role = user.role;
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{" "}
          <Link href="/signUp" style={{ color: "#192c4b" }}>
            Sign up
          </Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {authError && (
          <FormHelperText error sx={{ mt: -1, mb: 1 }}>
            {authError}
          </FormHelperText>
        )}

        <Stack spacing={2}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email address"
            type="email"
            error={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
            helperText={errors.email?.message}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                message:
                  "Must include upper, lower, number & special character",
              },
            })}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: showPassword ? (
                <EyeIcon
                  fontSize={20}
                  cursor="pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeSlashIcon
                  fontSize={20}
                  cursor="pointer"
                  onClick={() => setShowPassword(true)}
                />
              ),
            }}
          />

          {/* Forgot Password */}
          <Box textAlign="right">
            <Link href="/forgetPass" style={{ color: "#192c4b" }}>
              Forgot password?
            </Link>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              background:
                "linear-gradient(135deg, #122647 10%, #15b79e 40%, #122647 90%)",
              color: "white",
            }}
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
