const express = require('express');
const router = express.Router();
const userPlansController = require('../contollers/userPlansController');
const { authenticate } = require('../middleware/authMiddleware');

// Create a new user plan
router.post('/', userPlansController.createUserPlan);

// Read all user plans
router.get('/', authenticate, userPlansController.getAllUserPlans);

// Read a specific user plan by ID
router.get('/:userPlanId', authenticate, userPlansController.getUserPlanById);

// Update a user plan
router.put('/:userPlanId', authenticate, userPlansController.updateUserPlan);

// Delete a user plan
router.delete('/:userPlanId', authenticate, userPlansController.deleteUserPlan);

// Generate E-mail for expire of email
//router.post('/handle-expiration', userPlansController.handleExpiration);

module.exports = router;
