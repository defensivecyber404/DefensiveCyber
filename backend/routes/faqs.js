const express = require('express');
const Faq = require('../models/Faq');
const { authenticate } = require('../middleware');

const router = express.Router();

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ created_at: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new FAQ (Protected)
router.post('/', authenticate, async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  try {
    const newFaq = await Faq.create({ question, answer });
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a FAQ (Protected)
router.put('/:id', authenticate, async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  try {
    const updatedFaq = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );
    if (!updatedFaq) return res.status(404).json({ error: 'FAQ not found' });
    res.json(updatedFaq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a FAQ (Protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id);
    if (!deletedFaq) return res.status(404).json({ error: 'FAQ not found' });
    res.json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
