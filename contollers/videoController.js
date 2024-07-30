const Video = require('../models/videoModel');

// Create a new video
exports.createVideo = async (req, res) => {
  // Get the user ID from the request
  const { userId } = req;

  // Extract other necessary data from the request body
  const { videoName, video_file } = req.body;

  // Create a new video object with the associated user ID
  const newVideo = new Video({
    userId,
    videoName,
    video_file,
  });

  // Save the video to the database
  newVideo.save()
    .then((savedVideo) => {
      res.json(savedVideo);
    })
    .catch((error) => {
      console.error('Error in inserting video:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Read all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read a specific video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a video
exports.updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.videoId, req.body, { new: true });
    if (!updatedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.videoId);
    if (!deletedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(deletedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};
