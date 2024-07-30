const User = require('../models/user');

// Admin middleware
exports.adminMiddleware = async (req, res, next) => {
    const adminMiddleware = async (req, res, next) => {
        try {
          // Get user ID from request
          const { userId } = req;
      
          // Find user by ID in the database
          const user = await User.findById(userId);
      
          // Check if user is found and has the 'admin' role
          if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
          }
      
          next();
        } catch (error) {
          console.error('Error in admin middleware:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
};
    
    //module.exports = adminMiddleware;
