const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  video_name: {
    type: String,
    required: true,
  },
  video_file: {
    type: Buffer,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
