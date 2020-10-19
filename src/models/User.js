const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  active: { type: Boolean, default: true },
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);