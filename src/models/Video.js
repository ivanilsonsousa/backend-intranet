const mongoose = require('../database')

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String },
  createAt: { type: Date, default: Date.now }
}, {
  toJSON: {
      virtuals: true,
  }
})

VideoSchema.virtual('file_url').get(function() {
  return `http://${process.env.HOSTPORT}/files/videos-intranet/${this.file}`
})

module.exports = mongoose.model('Video', VideoSchema)