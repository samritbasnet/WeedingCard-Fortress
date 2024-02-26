import React, { useState } from "react";
import { Button, Container, TextField, Typography, Grid, Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import axios from 'axios';
import toast from "react-hot-toast";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!validateEmail(email)) {
      errors.email = 'Invalid email address';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3200/users/register', {
        firstName,
        lastName,
        email,
        password
      });
    
      toast.success("Successfully registered!");
      localStorage.setItem("token", response.data?.token);
      window.location.href = "/login";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Handle specific error messages from the server
        toast.error(`Registration failed: ${error.response.data.message}`);
      } else {
        // Handle generic error messages
        toast.error("Registration failed. Please try again later.");
      }
      console.error("Error registering user:", error.message);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: "64px", backgroundColor: "#dfe3ee", padding: "24px", borderRadius: "8px" }}>
      <Box textAlign="center" marginBottom="24px">
        <AccountCircle sx={{ fontSize: 80, color: '#2196F3', marginBottom: '24px' }} />
        <Typography variant="h4" component="h2" gutterBottom style={{fontWeight: 'bold', color:'#000'}}>
          Create an Account
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Fill out the form below to get started.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              size="small"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              size="small"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Signup;
