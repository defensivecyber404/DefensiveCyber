const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  emails: [{
    type: String,
    required: true
  }],
  phones: [{
    type: String,
    required: true
  }],
  locations: [{
    type: String,
    required: true
  }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
