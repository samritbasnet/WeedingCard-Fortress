const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the request headers
  const token = req.header('Authorization');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request object
    req.user = decoded.user;
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
