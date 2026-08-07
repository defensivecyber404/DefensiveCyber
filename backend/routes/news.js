const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

// Get external news via backend to bypass CORS and Mixed Content issues
router.get('/external', async (req, res) => {
  const { keywords, limit } = req.query;

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

// Get CISA News natively via fetch and rss-parser
router.get('/cisa', async (req, res) => {
  const { limit } = req.query;
  try {
    const response = await fetch('https://www.cisa.gov/cybersecurity-advisories/all.xml', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const xmlText = await response.text();
    const feed = await parser.parseString(xmlText);
    const items = feed.items.slice(0, parseInt(limit) || 30);
    const formattedData = {
      data: items.map(article => ({
        title: article.title,
        description: (article.contentSnippet || article.content || '').replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
        published_at: article.pubDate,
        url: article.link,
        image: 'https://www.cisa.gov/profiles/cisagov/themes/custom/gesso/images/favicon/apple-touch-icon.png',
        source: 'CISA'
      }))
    };
    res.json(formattedData);
  } catch (err) {
    console.error('CISA RSS Error:', err);
    res.status(500).json({ error: 'Failed to fetch CISA feed' });
  }
});

module.exports = router;
