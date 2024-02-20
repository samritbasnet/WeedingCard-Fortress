import React from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: 50 }}>
      <Typography variant="h4" align="center" gutterBottom>
        AI Image Generation
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Enter your prompt to generate images:
      </Typography>
      <TextField
        id="prompt"
        label="Prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your prompt here..."
      />
      <Button variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
        Generate Images
      </Button>
      {/* Image Cards */}
      <Typography variant="h6" align="center" style={{ marginTop: 30 }} gutterBottom>
        Generated Images
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        {/* Sample Image Cards */}
        {[1, 2, 3, 4, 5].map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Generated Image {item}
                </Typography>
                {/* Replace this with your image */}
                <img src={`https://via.placeholder.com/300x200?text=Image+${item}`} alt={`Image ${item}`} style={{ width: '100%' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;