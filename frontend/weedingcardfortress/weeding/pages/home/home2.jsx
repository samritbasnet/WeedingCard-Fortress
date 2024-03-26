import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

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

  const handleDownload = async (imageUrl) => {
    try {
        if (!isPaymentCompleted) {
          console.error('Payment is not completed yet.');
          return;
        }
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

  const handleImageClick = async (image) => {
    
    const response = await fetch('http://localhost:3001/payments/checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ image}),
    });

    if (!response.ok) 
    {
      
      throw new Error(`Error submitting review. Status: ${response.status}`);
    }
    const jsonresponse=await response.json();
    window.open(jsonresponse.url);

    // Handle success, clear form or update UI as needed
    console.log('Review submitted successfully');
    // You might want to clear the form or update the UI here

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

  const shareToFacebook = (imageUrl) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&amp;quote=${encodeURIComponent('Check out this generated image!')}`;
    window.open(shareUrl, '_blank');
  };

  const shareToTwitter = (imageUrl) => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent('Check out this generated image!')}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <Container maxWidth="lg" className="main-container" style={{ marginTop: 50, marginBottom: 100, backgroundColor: '#ffffff' }}>
      <Typography variant="h4" align="center" gutterBottom>
        AI Image Generation
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#fff' }}>
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

<Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#000' }}>
    Example Prompts:
  </Typography>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={4}>
      <Typography variant="subtitle2" align="center" gutterBottom style={{ color: '#000', cursor: 'pointer', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleExamplePromptCopy("Wedding invitation design in moss pink and ivory palette, watercolor style, expansive white central space for text, encircled by sharp focus intricate botanical details, highly detailed, vivid colors, ultra fine, watercolor paper texture, calligraphic font, botanical border, delicate shading, invitation card layout, soft edges, elegant, romantic, ultra-realistic.")}>
        1. Wedding invitation design in moss pink and ivory palette, watercolor style, expansive white central space for text, encircled by sharp focus intricate botanical details, highly detailed, vivid colors, ultra fine, watercolor paper texture, calligraphic font, botanical border, delicate shading, invitation card layout, soft edges, elegant, romantic, ultra-realistic.
      </Typography>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Typography variant="subtitle2" align="center" gutterBottom style={{ color: '#000', cursor: 'pointer', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleExamplePromptCopy("minimalistic creative professional wedding invitation cards design,card in the center of the screen, frontal landscape horizontal view, minimalism, ultra hd, realistic, vivid colors, highly detailed, UHD drawing, pen and ink, perfect composition, beautiful detailed intricate insanely detailed octane render trending on artstation, 8k artistic photography, photorealistic concept art, soft natural volumetric cinematic perfect light")}>
        2. minimalistic creative professional wedding invitation cards design,card in the center of the screen, frontal landscape horizontal view, minimalism, ultra hd, realistic, vivid colors, highly detailed, UHD drawing, pen and ink, perfect composition, beautiful detailed intricate insanely detailed octane render trending on artstation, 8k artistic photography, photorealistic concept art, soft natural volumetric cinematic perfect light
      </Typography>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Typography variant="subtitle2" align="center" gutterBottom style={{ color: '#000', cursor: 'pointer', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleExamplePromptCopy("Wedding invitation design in moss blue and ivory palette, watercolor style, expansive white central space for text, encircled by sharp focus intricate botanical details, highly detailed, vivid colors, ultra fine, watercolor paper texture, calligraphic font, botanical border, delicate shading, invitation card layout, soft edges, elegant, romantic, ultra-realistic.")}>
        3. Wedding invitation design in moss blue and ivory palette, watercolor style, expansive white central space for text, encircled by sharp focus intricate botanical details, highly detailed, vivid colors, ultra fine, watercolor paper texture, calligraphic font, botanical border, delicate shading, invitation card layout, soft edges, elegant, romantic, ultra-realistic.
      </Typography>
    </Grid>
  </Grid>
  <br></br>
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
                      <img src={imageUrl} alt={`Generated Image ${index + 1}`} className="image" onClick={() => handleImageClick(imageUrl)} />
                      <Button variant="outlined" color="primary" onClick={() => handleDownload(imageUrl)}>
                        Download
                      </Button>
                      <div style={{ marginTop: 10 }}>
                      <IconButton onClick={() => shareToFacebook(imageUrl)}>
                        <FacebookIcon />
                      </IconButton>
                      <IconButton onClick={() => shareToTwitter(imageUrl)}>
                        <TwitterIcon />
                      </IconButton>
                    </div>
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
