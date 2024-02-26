// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      email
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the user into the database
    // const newUser = await db.query(
    //   'INSERT INTO users (first_name, last_name, email, password) VALUES ("test","test2", "test7@gmail.com", test1234) RETURNING *',
    //   [firstName, lastName, email, hashedPassword]
    // );

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'fallbackSecret', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await User.findOne({
      email
    });

    if(user){
      const hashedPassword = user.password;
      const isValid = bcrypt.compareSync(password, hashedPassword);

      if(isValid){
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallbackSecret', { expiresIn: '1h' });

        res.send({
          token,
          user
        })
      }else{
        res.status(401).send({
          message: "Invalid password"
        })
      }
    }else{
      res.status(404).send({
        message: "no such user exists"
      })
    }
  }catch(err){
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { registerUser, loginUser };
