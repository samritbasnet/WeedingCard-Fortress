import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../navbar/logo2.jpeg';

const Navbar = () => {
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
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
