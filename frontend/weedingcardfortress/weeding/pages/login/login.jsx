import React, { useState } from "react";
import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import { AccountCircle, Google } from "@mui/icons-material";
import axios from 'axios';

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
      const response = await axios.post('http://localhost:3200/users/login', {
        email,
        password
      });
      console.log(response.data); // Handle successful login
      localStorage.setItem("token", response.data?.token);
      window.location.href = "/home";
    } catch (error) {
      console.error(error.response.data.message); // Handle login error
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "54px", minHeight: "90vh" }}>
      <AccountCircle sx={{ fontSize: 80, color: '#2196F3', marginBottom: '24px' }} />
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#ffff", fontWeight: "bold", textAlign: "center" }}>
        Welcome Back
      </Typography>
      <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ padding: "24px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginBottom: "24px", backgroundColor: "#FFFFFF" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
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
              Log In
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
      <Typography variant="body2" sx={{ marginTop: "24px", color: "#ffff", textAlign: "center" }}>
        Dont have an account?{" "}
        <a href="/register" style={{ color: "#2196F3" }}>
          Sign Up
        </a>
      </Typography>
    </Container>
  );
};

export default Login;
