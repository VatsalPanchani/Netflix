const express = require('express');
const router = express.Router();
const planController = require('../contollers/planController');
const { authenticate } = require('../middleware/authMiddleware');

// Create a new plan
router.post('/', planController.createPlan);

// Read all plans
router.get('/', authenticate, planController.getAllPlans);

// Read a specific plan by ID
router.get('/:planId', authenticate, planController.getPlanById);

// Update a plan
router.put('/:planId', authenticate, planController.updatePlan);

// Delete a plan
router.delete('/:planId', authenticate, planController.deletePlan);

module.exports = router;
