import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, IconButton, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Home2 = () => {
  const [prompt, setPrompt] = useState('');
  const [Nprompt, setNprompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    // Set the initial value of Nprompt when the component mounts
    setNprompt("ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy, extra limbs, poorly drawn face, poorly drawn hands, missing fingers");
  }, []);

  const handleGenerateImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, Nprompt }),
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

  const handleReviewSubmit = async () => {
    const newReview = { rating, review };
    setReviews([...reviews, newReview]);
    setRating(0);
    setReview('');
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:3001/submitReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ rating, review }),
      });

      if (!response.ok) {
        throw new Error(`Error submitting review. Status: ${response.status}`);
      }

      console.log('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error.message);
    } finally {
      setRating(0);
      setReview('');
    }
  };

  const paymentLink = 'https://buy.stripe.com/test_cN25ojggygjabn2eUU';

  const handleImageClick = () => {
    if (paymentStatus) {
      // Trigger download action here
      console.log('Downloading image...');
    } else {
      window.location.href = paymentLink;
    }
  };

  // Mock function to simulate successful payment
  const simulateSuccessfulPayment = () => {
    setPaymentStatus(true);
  };

  return (
    <Container maxWidth="lg" className="main-container">
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        AI Image Generation
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#444', marginBottom: '2rem' }}>
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
          style: { color: '#333' },
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      <TextField
        label="Negative Prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your negative prompt here..."
        value={Nprompt}
        onChange={(e) => setNprompt(e.target.value)}
        InputProps={{
          readOnly: true,
          style: { color: '#333', display: 'none' },
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
        InputLabelProps={{ style: { display: 'none' } }}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: '2rem', marginBottom: '1rem' }}
        onClick={handleGenerateImages}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Images'}
      </Button>
      {error && <div className="error-message">{error}</div>}
      {imageUrls.length > 0 && (
        <div className="generated-images">
          <Typography variant="h6" align="center" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }}>
            Generated Images
          </Typography>
          <Grid container spacing={2} className="images-grid">
            {imageUrls.map((imageUrl, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className="image-card" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ color: '#333' }}>
                      Generated Image {index + 1}
                    </Typography>
                    <img src={imageUrl} alt={`Generated Image ${index + 1}`} className="image" style={{ maxWidth: '100%' }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#333', marginBottom: '1rem' }}>
              Rate and Review
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <TextField
              id="review"
              label="Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleReviewSubmit}>
              Submit
            </Button>
            {reviews.map((r, index) => (
              <div key={index} style={{ marginTop: '1rem' }}>
                <Typography variant="subtitle1" gutterBottom style={{ color: '#333' }}>
                  Rating: {r.rating} | Review: {r.review}
                </Typography>
              </div>
            ))}
          </Container>
          {paymentStatus && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '2rem' }}
              onClick={handleDownload}
            >
              Download Images
            </Button>
          )}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Home2;
