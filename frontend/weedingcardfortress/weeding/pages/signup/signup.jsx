import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

const Signup = () => {
  return (
    <div style={{ backgroundColor: "#ECEFF1", minHeight: "100vh" }}>
      <Container
        maxWidth="md"
        sx={{
          paddingTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ color: "#37474F", fontWeight: "bold", textAlign: "center" }}
        >
          Sign Up
        </Typography>
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              marginBottom: "24px",
            }}
          >
            <form>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                id="email"
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ marginTop: "16px", borderRadius: "999px" }}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
