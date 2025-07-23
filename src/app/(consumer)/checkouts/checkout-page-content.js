"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  Divider,
  Card,
  CardContent,
  IconButton,
  Chip,
  Backdrop,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/navigation";
import { CreditCardIcon } from "@phosphor-icons/react";
import { SimCard, SimCardAlert } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaymentForm, { PayButton } from "@/app/components/payment"; // ✅ This is correct
import { useElements, useStripe } from "@stripe/react-stripe-js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast from "react-hot-toast";
import {  CircularProgress } from "@mui/material";

const CartSummary = ({
  productsTotal = 134.98,
  shipping = 9.99,
  itemsCount = 6,
}) => {
  const router = useRouter();
  const total = productsTotal + shipping;

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        // backgroundColor: "yellow",
        // height:"100vh",
        // borderRadius: 2,
        py: 10,
        px: 5,
        // boxShadow: 1,
        // border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={5}>
        Order Summary
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="body1" fontWeight="500">
          Subtotal ({itemsCount} {itemsCount === 1 ? "item" : "items"})
        </Typography>
        <Typography fontWeight="500">${productsTotal.toFixed(2)}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocalShippingIcon fontSize="small" />
          <Typography variant="body1" fontWeight="500">
            Shipping
          </Typography>
        </Box>
        <Typography fontWeight="500">${shipping.toFixed(2)}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <DiscountIcon fontSize="small" />
          <Typography variant="body1" fontWeight="500">
            Discount
          </Typography>
        </Box>
        <Typography fontWeight="500">-$0.00</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="body1" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          ${total.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

const steps = ["Shipping address", "Payment details", "Success"];

export default function CheckoutPageContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost", // dummy if you’re handling result manually
      },
      redirect: "if_required", // prevents automatic redirect
    });

    if (result.error) {
      console.error("❌ Payment error:", result.error.message);
      toast.error(result.error.message || "Payment failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      console.log("✅ Payment succeeded!");
      toast.success("Payment Successful!");
      setActiveStep(2); // 👉 move to the 'Success' step
    } else {
      toast("Processing payment...");
    }
    setIsLoading(false);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" gutterBottom fontWeight="bold" mb={3}>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField required label="First name" fullWidth size="small" />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField required label="Last name" fullWidth size="small" />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField required label="Address" fullWidth size="small" />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField required label="City" fullWidth size="small" />
              </Grid>
              <Grid item size={{ xs: 12, sm: 4 }}>
                <TextField
                  required
                  label="State/Province"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 4 }}>
                <TextField
                  required
                  label="Zip/Postal code"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 4 }}>
                <TextField required label="Country" fullWidth size="small" />
              </Grid>
              <Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked size="small" />}
                  label="Save this information for next time"
                />
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return <PaymentForm onSubmit={handleSubmit} />;
      case 2:
        return (
          //   <>
          //     <Typography variant="h6" gutterBottom fontWeight="bold" mb={1}>
          //       Review Your Order
          //     </Typography>
          //     <Box mb={2}>
          //       <Typography variant="subtitle1" fontWeight="bold">
          //         Shipping Address
          //       </Typography>
          //       <Typography>John Doe , </Typography>
          //       <Typography>123 Main St, Apt 4B</Typography>
          //       <Typography>New York, NY 10001</Typography>
          //       <Typography>United States</Typography>
          //     </Box>
          //     <Divider />
          //     <Box>
          //       <Typography variant="subtitle1" fontWeight="bold">
          //         Payment Method
          //       </Typography>
          //       <Typography>VISA ending in 1234</Typography>
          //       <Typography>Expires 12/24</Typography>
          //     </Box>
          //     {/* <Divider sx={{ my: 2 }} /> */}
          //     {/* <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          //       Order Items (3)
          //     </Typography> */}
          //     Here you would map through actual cart items
          //   </>
          <Box textAlign="center" py={6}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 80, color: "green", mb: 2 }}
            />
            <Typography variant="h4" gutterBottom>
              Payment Successful
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Thank you for your purchase! Your order has been placed
              successfully.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
              sx={{ borderRadius: 2, px: 4 }}
            >
              Back to Home
            </Button>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <Backdrop
        open={isLoading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          textTransform: "none",
        }}
        onClick={() => router.push("/carts")}
      >
        Back to Cart
      </Button>
      <Grid container spacing={2}>
        {/* Left Column - Order Summary */}
        <Grid item size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRight: "1px solid #e0e0e0",
              overflowY: "auto",
            }}
          >
            <CartSummary
              productsTotal={36390}
              shipping={deliveryMethod === "standard" ? 9.99 : 19.99}
              itemsCount={6}
            />
          </Box>
        </Grid>

        {/* Right Column - Checkout Form */}
        <Grid item size={{ xs: 12, md: 7 }}>
          <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {getStepContent(activeStep)}

            <Box
              sx={{
                position: "relative",
                height: 100, // enough height to fit both buttons
                mt: 6,
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ position: "relative", height: 100, marginTop: 48 }}
              >
                {activeStep === 1 ? (
                  // PAY Button (only on step 1)
                  <PayButton
                    disabled={!stripe || isLoading}
                    isLoading={isLoading}
                  />
                ) : (
                  // Continue / Review / Place Order
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    size="medium"
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      right: 0,
                      minWidth: 120,
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? "Place Order"
                      : activeStep === steps.length - 2
                      ? "Review Order"
                      : "Continue"}
                  </Button>
                )}

                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    size="medium"
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      left: 0,
                      minWidth: 120,
                    }}
                  >
                    Back
                  </Button>
                )}
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
