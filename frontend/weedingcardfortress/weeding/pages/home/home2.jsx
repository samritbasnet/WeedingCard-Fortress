import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Home2 = () => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, width, height }),
      });

      if (!response.ok) {
        throw new Error(`Error generating image. Status: ${response.status}`);
      }

      const data = await response.json();
      setImageUrls(data.imageUrls);
    } catch (error) {
      console.error('Error generating image:', error.message);
      setError('Error generating image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="main-container">
      <Typography variant="h4" align="center" gutterBottom>
        AI Image Generation
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#000' }}>
        Enter your prompt to generate images:
      </Typography>
      <TextField
        label="Prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        InputProps={{
          style: { color: '#29272D' },
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <TextField
        label="Width"
        variant="outlined"
        fullWidth
        margin="normal"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <TextField
        label="Height"
        variant="outlined"
        fullWidth
        margin="normal"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className="generate-button"
        onClick={handleGenerateImages}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Images'}
      </Button>
      {error && <div className="error-message">{error}</div>}
      {imageUrls.length > 0 && (
        <div className="generated-images">
          <Typography variant="h6" align="center" gutterBottom>
            Generated Images
          </Typography>
          <Grid container spacing={2} className="images-grid">
            {imageUrls.map((imageUrl, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className="image-card">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Generated Image {index + 1}
                    </Typography>
                    <img src={imageUrl} alt={`Generated Image ${index + 1}`} className="image" />
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

export default Home2;
