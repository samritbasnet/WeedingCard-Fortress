import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, makeStyles } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  promptTextField: {
    marginBottom: theme.spacing(2),
  },
  generateButton: {
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  imageCard: {
    marginBottom: theme.spacing(2),
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/random?count=12&query=${prompt}&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (prompt.trim() !== '') {
      fetchImages();
    }
  }, [prompt]);

  const handleGenerateImages = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?count=12&query=${prompt}&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 50, backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        AI Image Generation
      </Typography>
      <TextField
        id="prompt"
        label="Prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your prompt here..."
        InputLabelProps={{ style: { color: '#000000' } }}
        InputProps={{ style: { color: '#000000' } }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className={classes.promptTextField}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.generateButton}
        onClick={handleGenerateImages}
      >
        Generate Images
      </Button>
      {/* Image Cards */}
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className={classes.imageCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Image {index + 1}
                </Typography>
                <img src={image.urls.small} alt={`Image ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
