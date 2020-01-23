const mongoose = require('../database')

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostSchema)