const express = require('express');
const router = express.Router();
const CompanyInfo = require('../models/CompanyInfo');
const { authenticate } = require('../middleware');

// GET /api/company-info - Get company info
router.get('/', async (req, res) => {
  try {
    let info = await CompanyInfo.findOne();
    if (!info) {
      // Create default if none exists
      info = await CompanyInfo.create({
        emails: ['defensivecyber404@gmail.com'],
        phones: ['+91 99716 24200'],
        locations: ['New Delhi, India']
      });
    }
    res.json(info);
  } catch (error) {
    console.error('Error fetching company info:', error);
    res.status(500).json({ error: 'Failed to fetch company info' });
  }
});

// PUT /api/company-info - Update company info (Admin only)
router.put('/', authenticate, async (req, res) => {
  try {
    const { emails, phones, locations } = req.body;
    
    // There should only be one document, find it or create if missing
    let info = await CompanyInfo.findOne();
    
    if (info) {
      info.emails = emails;
      info.phones = phones;
      info.locations = locations;
      await info.save();
    } else {
      info = await CompanyInfo.create({
        emails,
        phones,
        locations
      });
    }
    
    res.json(info);
  } catch (error) {
    console.error('Error updating company info:', error);
    res.status(500).json({ error: 'Failed to update company info' });
  }
});

module.exports = router;
