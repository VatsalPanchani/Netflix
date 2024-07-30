// userPlan.js

const mongoose = require('mongoose');

// User Plan schema
const userPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  activationDate: {
    type: Date,
  },
  expirationDate: {
    type: Date,
  },
});

module.exports = mongoose.model('user_plan', userPlanSchema);
