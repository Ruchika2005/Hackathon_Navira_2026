const mongoose = require('mongoose');

const SirenReportSchema = new mongoose.Schema({
  message: { type: String, required: true, maxlength: 300 },
  lang:    { type: String, default: 'english' },
  // auto-delete after 24 hours via MongoDB TTL index
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

module.exports = mongoose.model('SirenReport', SirenReportSchema);
