import React, { useState } from "react";
import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import { AccountCircle,  Google } from "@mui/icons-material";
import axios from 'axios';
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
      console.log(response.data); // Handle successful login
      toast.success("Successfully login!");
      localStorage.setItem("token", response.data?.token);
      window.location.href = "/home";
    } catch (error) {
      console.error(error.response.data.message); // Handle login error
    }
  };

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
          Welcome Back
        </Typography>
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              marginBottom: "24px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    helperText={errors.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
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
              color="error"
              startIcon={<Google />}
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
          <a href="/register" style={{ color: "#2196F3" }}>
            Sign Up
          </a>
        </Typography>
      </Container>
    </div>
  );
};

export default Login;