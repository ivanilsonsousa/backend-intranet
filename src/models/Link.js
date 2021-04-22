const mongoose = require('../database');

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String },
  type: { type: String },
  format: { type: String },
  parent: {type: String, required: true },
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Link', LinkSchema);