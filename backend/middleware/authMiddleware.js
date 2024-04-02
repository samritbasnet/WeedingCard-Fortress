// authMiddleware.js

const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = '10ebd45c0a2c97a3aefd38616f1b3c6d0e2117c5d23688e234a2acb42a9f6ddc';

const generateToken = (userId) => {
  return jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = verifyToken(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please log in again' });
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken || !decodedToken.user || !decodedToken.user.id) {
      throw new Error('Invalid token format');
    }
    return decodedToken.user.id;
  } catch (error) {
    throw error; // throw error directly instead of creating a new Error object
  }
};

module.exports = { authMiddleware, generateToken, verifyToken, getUserIdFromToken };
