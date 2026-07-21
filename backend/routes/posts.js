const express = require('express');
const Post = require('../models/Post');
const { authenticate } = require('../middleware');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_at: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post (Protected)
router.post('/', authenticate, async (req, res) => {
  const { title, excerpt, content, type } = req.body;
  if (!title || !excerpt || !content || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newPost = await Post.create({ title, excerpt, content, type });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post (Protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Post not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post (Protected)
router.put('/:id', authenticate, async (req, res) => {
  const { title, excerpt, content, type } = req.body;
  if (!title || !excerpt || !content || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, excerpt, content, type },
      { new: true } // Returns the updated document
    );
    
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
