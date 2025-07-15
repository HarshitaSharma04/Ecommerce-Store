import { Box, Container, Typography, Link } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      sx={{
        pt: 6,
        pb: 6,
        borderTop: "1px solid #ddd",
        background:
          "linear-gradient(135deg, #15b79e 0%, #b5c0d2 40%, #122647 100%)",
        color: "#192c4b",
        component:"footer" ,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Logo and Description */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center" mb={1}>
              <Image
                src="/logo.svg"
                alt="ShopSmart Logo"
                width={40}
                height={40}
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                ShopSmart
              </Typography>
            </Box>
            <Typography variant="body2" textAlign="center">
              Your one-stop shop for fashion, electronics, and more.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {["Home", "Products", "Cart", "Login"].map((text, index) => (
              <Link
                key={index}
                href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                underline="hover"
                color="inherit"
                display="block"
                sx={{ my: 0.5 }}
              >
                {text}
              </Link>
            ))}
          </Box>

          {/* Contact Info */}
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: support@shopsmart.com
            </Typography>
            <Typography variant="body2">Phone: +91 98765 43210</Typography>
          </Box>
        </Box>

        {/* Footer Bottom */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} ShopSmart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
