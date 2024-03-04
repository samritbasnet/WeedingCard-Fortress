import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, IconButton, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  // State variables for managing user ratings and reviews
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // Function to handle submission of ratings and reviews
  const handleReviewSubmit = () => {
    const newReview = { rating, review };
    setReviews([...reviews, newReview]);
    // Here you can add logic to submit the review to a backend server if needed
    // Clear input fields after submission
    setRating(0);
    setReview('');
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 50, marginBottom: 100, backgroundColor: '#ffffff' }}>
      <Typography variant="h4" align="center" gutterBottom >
        AI Image Generation
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#000' }}>
        Enter your prompt to generate images:
      </Typography>
      {/* Prompt input field */}
      <TextField
        id="prompt"
        label="Prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your prompt here..."
        InputProps={{
          style: { color: '#29272D' }, // Set text color to light
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          )
        }}
      />
      {/* Button to generate images */}
      <Button variant="contained" color="secondary" size="small" style={{ marginTop: 10, width: '150px', backgroundColor: '#87AEDC', color: '#ffffff' }}>
        Generate Images
      </Button>
      {/* Image Cards */}
      <Typography variant="h6" align="center" style={{ marginTop: 30 }} gutterBottom>
        Generated Images
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        {/* Sample Image Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4}>
            <Card style={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' }, height: '300px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Generated Image {item}
                </Typography>
                {/* Replace this with your image */}
                <img src={`https://source.unsplash.com/1600x900/?wedding-card/300x200?text=Image+${item}`} alt={`Image ${item}`} style={{ width: '100%', borderRadius: 8 }} />
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
    </Container>
  );
};

export default Home;
