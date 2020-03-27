const mongoose = require('../database')

const PhoneSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Phone', PhoneSchema)