import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#F8E1FF', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#6A1B9A', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
          Welcome to our Wedding App
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#9C27B0', textAlign: 'center', marginBottom: '32px' }}>
          Plan your dream wedding with ease
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: '999px', backgroundColor: '#FF4081', '&:hover': { backgroundColor: '#F50057' } }}>
            Get Started
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
