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
const { authMiddleware, generateToken, verifyToken } = require('./middleware/authMiddleware');



const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());



// MongoDB 
mongoose.connect('mongodb://localhost:27017/WeddingCard')
    .then(function () { console.log('connected successfully') })
    .catch(function (err) { console.log('DB was not connected' + err) }); 

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });


app.post("/login",async (req,res)=>{
  try {
    const email = req.body["email"];
    const password = req.body["password"];
    console.log("email:" + email);
    console.log("password:" + password);
    
  
    const user = await UserModel.findOne({ email });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user._id);
    console.log("token:" + token);

    res.status(200).json({ message: 'Login successful', token});
    console.log('Login successful');
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/submitReview', authMiddleware, async (req, res) => {
  
  
  try {
    const { rating, review } = req.body;


    const userId = req.user.id;
    // Create a new review instance with the found user's _id
    const newReview = new Review({ user: userId, rating, review });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/auth', authRoute);
app.use("/users", userRoute);
app.use('/image', imageRoute);

// Register route handler
app.post("/register", userController.registerUser);

// Login route handler
app.post("/login", userController.loginUser);

app.post('/generateImage', imageController.generateImage);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
