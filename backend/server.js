const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const userController = require('./controllers/userController');
const UserModel = require('./models/User');
const imageRoute = require('./routes/imageRoute');
const userRoute = require("./routes/userRoute");
const imageController = require('./controllers/ImageController');
const Review = require('./models/Review');
const ReviewGoogle = require('./models/Reviewgoogle');
const { authMiddleware, generateToken, getUserIdFromToken} = require('./middleware/authMiddleware');
const paymentRoute =require("./routes/paymentRoute");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/WeddingCard', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Failed to connect to MongoDB:', error));

// Route to submit review
app.post('/submitReview', authMiddleware, async (req, res) => {
  console.log("test ");
  try {
    const { rating, review } = req.body;
    const userId = req.user.userId;

    // Create a new review instance with the user's _id
    const newReview = new Review({ user: userId, rating, review });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {

    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to submit review
app.post('/submitReviewGoogle', async (req, res) => {
  console.log("test ");
  try {
    const { rating, review } = req.body;

    const token = req.headers.authorization;
    console.log(token);
    const userId = getUserIdFromToken(token);

    // Create a new review instance with the user's _id
    const newReview = new ReviewGoogle({ user: userId, rating, review });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({ message: 'ReviewGoogle submitted successfully' });
  } catch (error) {

    console.error('Error submitting reviewGoogle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/generate-token', (req, res) => {
  const uid = req.body.uid; 

  
  const token = generateToken(uid);

 
  res.json({ token });
});

// Other routes
app.use(express.urlencoded({ extended: false }));
app.use('/payments',paymentRoute)
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/image', imageRoute);

// Register route handler
app.post('/register', userController.registerUser);

// Login route handler
app.post('/login', userController.loginUser);

// Image generation route handler
app.post('/generateImage', imageController.generateImage);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
