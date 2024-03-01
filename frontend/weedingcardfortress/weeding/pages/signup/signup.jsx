import React, { useState } from "react";
import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one letter and one number';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        firstName,
        lastName,
        email,
        password
      });
      console.log(response.data); // Handle successful signup
    } catch (error) {
      console.error(error.response.data.message); // Handle signup error
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Define gradient colors and angle
      minHeight: "100vh", // Ensure full height
      display: "flex", // Use flex to center content vertically
      alignItems: "center", // Center vertically
      justifyContent: "center", // Center horizontally
    }}>
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
          sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }} // Change text color to white
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
            <form onSubmit={handleSubmit}>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                id="email"
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              <Button
                type="submit"
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
