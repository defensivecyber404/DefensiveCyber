const express = require('express');
const Contact = require('../models/Contact');
const { authenticate } = require('../middleware');
const { sendContactEmail } = require('../utils/emailService');

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  const { name, email, service, message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'Database is not connected. Please ensure MONGO_URI is set correctly in Vercel Environment Variables.' });
    }

    const newContact = await Contact.create({ name, email, service, message });
    
    // Send email notification asynchronously so the user doesn't have to wait
    sendContactEmail({ name, email, service, message }).catch(err => console.error("Email send error:", err));
    
    res.status(201).json({ success: true, message: 'Message received' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contact submissions (Protected)
router.get('/', authenticate, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ created_at: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
