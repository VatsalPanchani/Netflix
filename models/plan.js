// plan.js

const mongoose = require('mongoose');

// Plan schema
const planSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['mobile', 'basic', 'standard', 'premium'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    enum: ['480p', '720p', '1080p', '4K'],
    required: true,
  },
  quality: {
    type: String,
    enum: ['normal', 'good', 'better', 'best'],
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Plan', planSchema);
