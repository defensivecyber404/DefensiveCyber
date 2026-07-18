const express = require('express');
const db = require('../database');
const { authenticate } = require('../middleware');

const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
  try {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single post
router.get('/:id', (req, res) => {
  try {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post (Protected)
router.post('/', authenticate, (req, res) => {
  const { title, excerpt, content, type } = req.body;
  if (!title || !excerpt || !content || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO posts (title, excerpt, content, type) 
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(title, excerpt, content, type);
    
    const newPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post (Protected)
router.delete('/:id', authenticate, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
