const mongoose = require('../database');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    active: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);