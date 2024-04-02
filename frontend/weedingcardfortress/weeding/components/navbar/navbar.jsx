import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import logo from '../navbar/logo.jpeg';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform logout actions here, e.g., clearing session, redirecting to login page
    // After logout, close the dropdown menu
    localStorage.removeItem("token");
    localStorage.removeItem("IsLogin");
    localStorage.removeItem("IsGoogleLogin");
    handleMenuClose();
    // Example redirect to login page:
    window.location.href = "/login";
  };

  // Render logout button only on the home screen
  const renderLogoutButton = () => {
    if (location.pathname === '/home2' || location.pathname === '/home') {
      return (
        <Button color="inherit" onClick={handleMenuOpen}>Logout</Button>
      );
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={logo} alt="Logo" sx={{ width: '40px', marginRight: '8px' }} /> {/* Displaying the logo */}
          EverAfter Cards      
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          {renderLogoutButton()}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
