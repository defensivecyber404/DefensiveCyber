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
    const newContact = await Contact.create({ name, email, service, message });
    
    // Send email notification asynchronously
    sendContactEmail({ name, email, service, message });
    
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
