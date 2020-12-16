const mongoose = require('../database');

const PopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String },
  type: { type: String, required: true },
  parent: {type: String, required: true },
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pop', PopSchema);