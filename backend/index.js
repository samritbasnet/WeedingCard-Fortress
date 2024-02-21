const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/authRoute');

const pool = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3200;


// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email: " + email);
  console.log("password: " + password);

  const insertSTMT = `INSERT INTO accounts(email, password) VALUES (?, ?)`;
  const values = [email, password];

  pool.query(insertSTMT, values, (error, response) => {
    if (error) {
      console.error("Error occurred while executing SQL query:", error);
      res.status(500).send("Error occurred while processing your request.");
    } else {
      console.log("Data saved:", response);
      res.send("Data saved successfully.");
    }
  });
});

// Routes
app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
