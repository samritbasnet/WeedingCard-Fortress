import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Home = () => {
  return (
    <div style={{ 
      backgroundImage: "url('https://source.unsplash.com/1600x900/?wedding-card')",
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFBF7'
    }}>
      <Container maxWidth="md" sx={{ paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#ffff', fontWeight: 'bold', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          Create Stunning Wedding Cards
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#ffff', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          Design personalized wedding cards with ease
        </Typography>
        <div style={{ marginTop: '32px' }}>
          {/* Use Link component to navigate to login page */}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: '999px' }}>
              Get Started
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Home;
