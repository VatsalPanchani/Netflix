const Plan = require('../models/plan');

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    const savedPlan = await newPlan.save();
    res.json(savedPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read a specific plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a plan
exports.updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.planId, req.body, { new: true });
    if (!updatedPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.planId);
    if (!deletedPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(deletedPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
