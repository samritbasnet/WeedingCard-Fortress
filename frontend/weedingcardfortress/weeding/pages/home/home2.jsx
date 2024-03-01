import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateImages = async () => {
    const prompt = document.getElementById('prompt').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;

    setLoading(true);

    try {
      // Make a POST request to your server's /generateImage endpoint
      const response = await fetch('/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, width, height }),
      });

      // Parse the response JSON
      const data = await response.json();

      // Set the generated image URLs
      setImageUrls(data.imageUrls);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 50, marginBottom: 100, backgroundColor: '#ffffff' }}>
      <Typography variant="h4" align="center" gutterBottom>
        AI Image Generation
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#000' }}>
        Enter your prompt to generate images:
      </Typography>
      <TextField
        id="prompt"
        label="Prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your prompt here..."
        InputProps={{
          style: { color: '#29272D' },
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <TextField id="width" label="Width" variant="outlined" fullWidth margin="normal" />
      <TextField id="height" label="Height" variant="outlined" fullWidth margin="normal" />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        style={{ marginTop: 10, width: '150px', backgroundColor: '#87AEDC', color: '#ffffff' }}
        onClick={handleGenerateImages}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Images'}
      </Button>
      {/* Display generated images */}
      {imageUrls.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Generated Images
          </Typography>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            {imageUrls.map((imageUrl, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card style={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' }, height: '300px' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Generated Image {index + 1}
                    </Typography>
                    <img src={imageUrl} alt={`Generated Image ${index + 1}`} style={{ width: '100%', borderRadius: 8 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default Home;
