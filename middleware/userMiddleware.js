const User = require('../models/user');

// User middleware
exports.userMiddleware = async (req, res, next) => {
  try {
    // Get user ID from request (assuming it's set in a previous middleware)
    const { userId } = req;

    // Find user by ID
    const user = await User.findById(userId);

    // Check if user is an admin
    if (user.role === 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error('Error in user middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//module.exports = userMiddleware;
