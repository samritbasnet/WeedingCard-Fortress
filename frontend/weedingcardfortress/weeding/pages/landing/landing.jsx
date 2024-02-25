import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#E1F5FE', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#0D47A1', fontWeight: 'bold', textAlign: 'center' }}>
          Create Stunning Wedding Cards
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#1565C0', textAlign: 'center' }}>
          Design personalized wedding cards with ease
        </Typography>
        <div style={{ marginTop: '32px' }}>
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: '999px' }}>
            Get Started
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
