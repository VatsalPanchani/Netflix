const jwt = require('jsonwebtoken');

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error in authentication:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Middleware to authorize admin access
const authorizeAdmin = (req, res, next) => {
  const adminId = '649d573c68964f844b6c90b5'; // Admin ID

  if (req.user._id.toString() !== adminId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
