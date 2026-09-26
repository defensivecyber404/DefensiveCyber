const express = require('express');
const multer = require('multer');
const router = express.Router();
const Image = require('../models/Image');

// Use memory storage to get the file buffer directly
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// Jodit expects a specific JSON response format for file uploads
router.post('/', upload.any(), async (req, res) => {
  try {
    const uploadedFiles = req.files || (req.file ? [req.file] : []);
    
    if (uploadedFiles.length === 0) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const savedImages = [];

    // Save each file buffer to MongoDB
    for (const file of uploadedFiles) {
      const newImage = new Image({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer
      });
      const saved = await newImage.save();
      savedImages.push(saved);
    }

    const fileIds = savedImages.map(img => img._id.toString());
    const isImages = savedImages.map(img => img.contentType.startsWith('image/'));

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const defaultBaseUrl = `${protocol}://${host}`;
    const baseUrl = req.query.baseUrl || defaultBaseUrl;
    
    // The new base URL for images will point to our GET route below
    const fullBaseUrl = `${baseUrl}/api/upload/img/`;

    res.json({
      success: true,
      time: new Date().toISOString(),
      data: {
        baseurl: fullBaseUrl,
        messages: [],
        isImages: isImages,
        code: 220,
        path: fullBaseUrl,
        files: fileIds // Jodit will append this ID to the baseurl
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to serve the image from MongoDB
router.get('/img/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    
    res.set('Content-Type', image.contentType);
    res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
    res.send(image.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
