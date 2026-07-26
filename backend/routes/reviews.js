const express = require('express');
const Review = require('../models/Review');
const { authenticate } = require('../middleware');

const router = express.Router();

// Get all Reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ created_at: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new Review (Protected)
router.post('/', authenticate, async (req, res) => {
  const { text, companyAndPost } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const newReview = await Review.create({ text, companyAndPost });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Review (Protected)
router.put('/:id', authenticate, async (req, res) => {
  const { text, companyAndPost } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { text, companyAndPost },
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ error: 'Review not found' });
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Review (Protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
