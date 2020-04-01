const mongoose = require('../database')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)