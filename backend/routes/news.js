const express = require('express');
const router = express.Router();

// Get external news via backend to bypass CORS and Mixed Content issues
router.get('/external', async (req, res) => {
  const { apiKey, keywords, limit } = req.query;
  
  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    // We bypass the limit-ridden API keys entirely and use a free RSS-to-JSON service 
    // to pull the latest real cybersecurity news from The Hacker News.
    const rssUrl = encodeURIComponent('https://thehackernews.com/feeds/posts/default?alt=rss');
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.status !== 'ok') {
      return res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
    
    // Map RSS items to what the frontend currently expects (Mediastack format)
    const items = result.items.slice(0, limit || 6);
    const formattedData = {
      data: items.map(article => ({
        title: article.title,
        description: article.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...', // Strip HTML tags for excerpt
        published_at: article.pubDate,
        url: article.link,
        image: article.enclosure?.link || article.thumbnail || 'https://via.placeholder.com/800x400?text=Cybersecurity+News'
      }))
    };
    
    res.json(formattedData);
  } catch (err) {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
