const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
require("./mongo");
const userRoute = require("./routes/userRoute");
const userController = require('./controllers/userController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3200;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoute);
app.use("/users", userRoute);

// Register route handler
app.post("/register", userController.registerUser);

// Login route handler
app.post("/login", userController.loginUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
