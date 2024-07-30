const express = require('express');
const router = express.Router();
const userController = require('../contollers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// Create a new user
router.post('/', userController.createUser);

// Read all users
router.get('/', authenticate, userController.getAllUsers);

// Read a specific user by ID
router.get('/:userId', authenticate, userController.getUserById);

// Update a user
router.put('/:userId', authenticate, userController.updateUser);

// Delete a user
router.delete('/:userId', authenticate, userController.deleteUser);

// User signup
router.post('/signup', userController.signup);

// User login
router.post('/login', userController.login);

module.exports = router;
