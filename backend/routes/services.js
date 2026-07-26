const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authenticate } = require('../middleware');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ created_at: 1 });
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Server error fetching services' });
  }
});

// GET a specific service by slug or id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({ 
      $or: [
        { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
        { slug: req.params.id }
      ]
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({ error: 'Server error fetching service' });
  }
});

// POST a new service (Admin only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, fullDescription, icon, slug } = req.body;
    
    // Auto-generate slug if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const newService = new Service({
      title,
      description,
      fullDescription,
      icon: icon || 'Search',
      slug: finalSlug
    });
    
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error('Error creating service:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'A service with this title/slug already exists' });
    }
    res.status(500).json({ error: 'Server error creating service' });
  }
});

// PUT update a service (Admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description, fullDescription, icon, slug } = req.body;
    
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        fullDescription,
        icon,
        slug: finalSlug
      },
      { new: true }
    );
    
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(updatedService);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Server error updating service' });
  }
});

// DELETE a service (Admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Server error deleting service' });
  }
});

module.exports = router;
