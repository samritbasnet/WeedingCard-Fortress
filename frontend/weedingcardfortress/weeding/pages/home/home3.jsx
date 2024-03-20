import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, IconButton, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Home2 = () => {
  const [prompt, setPrompt] = useState('');
  const [Nprompt, setNprompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleDownload = async (imageUrl) => {
    try {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `image_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error.message);
    }
  };

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

      // Handle success, clear form or update UI as needed
      console.log('Review submitted successfully');
      // You might want to clear the form or update the UI here

    } catch (error) {
      console.error('Error submitting review:', error.message);
      // Handle error, display a message to the user, etc.
      // You might want to show an error message to the user

    } finally {
      // Any cleanup or additional logic that needs to run regardless of success or failure can go here
      // For example, you might want to hide a loading spinner
      setRating(0);
      setReview('');
    }
  };

  return (
    <Container maxWidth="lg" className="main-container">
      {/* Hidden input for user's email */}
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
        label="Negative Prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your negative prompt here..."
        value={Nprompt}
        onChange={(e) => setNprompt(e.target.value)}
        InputProps={{
          readOnly: true,
          style: { color: '#29272D', display: 'none' },
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
                    <Button variant="outlined" color="primary" onClick={() => handleDownload(imageUrl)}>
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* User rating and review section */}
<Container maxWidth="md" style={{ marginTop: 30 }}>
        <Typography variant="h6" gutterBottom>
          Rate and Review
        </Typography>
        {/* Rating input */}
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        {/* Review input */}
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
        {/* Button to submit review */}
        <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
          Submit
        </Button>
        {/* Display submitted reviews */}
        {reviews.map((r, index) => (
          <div key={index}>
            <Typography variant="subtitle1" gutterBottom>
              Rating: {r.rating} | Review: {r.review}
            </Typography>
          </div>
        ))}
      </Container>
        </div>
      )}
    </Container>
  );
};

export default Home2;
