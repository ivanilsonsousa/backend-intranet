const mongoose = require('../database');

const MessagePopupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessagePopup', MessagePopupSchema);