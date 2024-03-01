// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const UserModel = require('../models/User');


// const registerUser = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   console.log("Register User - firstName:", firstName);
//   console.log("Register User - lastName:", lastName);
//   console.log("Register User - email:", email);
//   console.log("Register User - password:", password);

 
//   try {
//     // Check if the user already exists
//     const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Insert the user into the database
//      const newUser = await pool.query(
//        'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
//        [firstName, lastName, email, hashedPassword]
//      );

//     // Generate JWT token
//     const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    

//     res.status(201).json({ token }, { message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { registerUser };


const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("Register User - firstName:", firstName);
  console.log("Register User - lastName:", lastName);
  console.log("Register User - email:", email);
  console.log("Register User - password:", password);

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user using the UserModel
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    //const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerUser };