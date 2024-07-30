const user = require('../models/user');

// Create a new user
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async (req, res) => {
  try {
          const { name, password, email, roll } = req.body;
      
          // Validate password requirements
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
          if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.' });
          }
      
          const newUser = new user({
            name,
            password,
            email,
            roll
          });
      
          const savedUser = await newUser.save();
          res.json(savedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
};


// Read all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create a new user
    const users = new user({
      name,
      email,
      password,
      role,
    });
    await users.save();
    // Generate JWT token
    const token = users.generateToken();

    res.status(201).json({ token });

  } catch (error) {
    console.error('Error in user signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = user.generateToken();

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
