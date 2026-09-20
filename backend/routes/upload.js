const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Ensure the directory exists or multer will create it? multer usually doesn't create directories for `diskStorage` if not specified correctly, but we'll use a simple setup.
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Jodit expects a specific JSON response format for file uploads
// https://xdsoft.net/jodit/docs/classes/modules_uploader.Uploader.html
router.post('/', upload.any(), (req, res) => {
  try {
    const uploadedFiles = req.files || (req.file ? [req.file] : []);
    
    if (uploadedFiles.length === 0) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const fileNames = uploadedFiles.map(f => f.filename);
    const isImages = uploadedFiles.map(f => f.mimetype.startsWith('image/'));

    const fullBaseUrl = `/uploads/`;

    res.json({
      success: true,
      time: new Date().toISOString(),
      data: {
        baseurl: fullBaseUrl,
        messages: [],
        isImages: isImages,
        code: 220,
        path: fullBaseUrl,
        files: fileNames
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
