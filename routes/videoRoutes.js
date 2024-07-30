const express = require('express');
const router = express.Router();
const videoController = require('../contollers/videoController');
const { authenticate } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/multerMiddleware');
const { userMiddleware } = require('../middleware/userMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

// Get video file (accessible by users and admins)
router.get('/:id', userMiddleware, videoController.getAllVideos);

// Insert video file (accessible by admins only)
router.post('/', upload, adminMiddleware, videoController.createVideo);

// Update video file (accessible by admins only)
router.put('/:id', adminMiddleware, videoController.updateVideo);

// Delete video file (accessible by admins only)
router.delete('/:id', adminMiddleware, videoController.deleteVideo);

// Read a specific video by ID
router.get('/:videoId', authenticate, videoController.getVideoById);

module.exports = router;
