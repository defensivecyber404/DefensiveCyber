const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
    default: 'Search' // Fallback icon name
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Service', serviceSchema);
