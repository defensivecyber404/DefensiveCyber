const express = require('express');
const db = require('../database');
const { authenticate } = require('../middleware');

const router = express.Router();

// Submit contact form
router.post('/', (req, res) => {
  const { name, email, service, message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, service, message) 
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(name, email, service, message);
    
    res.status(201).json({ success: true, message: 'Message received' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contact submissions (Protected)
router.get('/', authenticate, (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
