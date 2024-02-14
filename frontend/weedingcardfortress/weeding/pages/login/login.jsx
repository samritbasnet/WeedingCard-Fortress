import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  return (
    <div style={{ backgroundColor: "#ECEFF1", minHeight: "100vh" }}>
      <Container
        maxWidth="sm"
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
          component="h1"
          gutterBottom
          sx={{ color: "#37474F", fontWeight: "bold", textAlign: "center" }}
        >
          Login
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
                id="email"
                label="Email Address"
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
                Sign In
              </Button>
            </form>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ borderRadius: "999px" }}
            >
              Sign In with Facebook
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              size="large"
              sx={{ borderRadius: "999px" }}
            >
              Sign In with Google
            </Button>
          </div>
        </div>
        <Typography
          variant="body2"
          sx={{ marginTop: "24px", color: "#455A64" }}
        >
          Dont have an account?{" "}
          <a href="/" style={{ color: "#2196F3" }}>
            Sign Up
          </a>
        </Typography>
      </Container>
    </div>
  );
};

export default Login;
