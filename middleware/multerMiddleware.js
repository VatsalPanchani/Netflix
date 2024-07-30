const multer = require('multer');

// Set storage options for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.replace(/\s/g, '-'); 
    cb(null, filename + '-' + uniqueSuffix);
  },
});

// Define file filter function for Multer
const fileFilter = (req, file, cb) => {
  if (file.mimetype === ('video/mp4')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only video files are allowed.'), false);
  }
};

// Create the Multer upload instance
exports.upload = multer({
  storage,
  // fileFilter,
}).single('video_file');

// Middleware to log file details
// exports.logUploadedFile = (req, res, next) => {
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred
//       console.error('Multer error:', err);
//       res.status(400).json({ error: 'File upload error' });
//     } else if (err) {
//       // An unknown error occurred
//       console.error('Unknown error:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       console.log(error);
//     } else {
//       // Log the uploaded file details
//       console.log('Uploaded file:', req.file);

//       // Pass control to the next middleware/route handler
//       next();
//     }
//   });
// };

//module.exports = { upload, logUploadedFile };
