const express = require('express');
const Client = require('../models/Client');
const { authenticate } = require('../middleware');

const router = express.Router();

// Get all Clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ created_at: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new Client (Protected)
router.post('/', authenticate, async (req, res) => {
  const { name, location } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const newClient = await Client.create({ name, location });
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Client (Protected)
router.put('/:id', authenticate, async (req, res) => {
  const { name, location } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { name, location },
      { new: true }
    );
    if (!updatedClient) return res.status(404).json({ error: 'Client not found' });
    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Client (Protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
