const mongoose = require('../database');

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
  link: { type: String, required: true },
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Link', LinkSchema);