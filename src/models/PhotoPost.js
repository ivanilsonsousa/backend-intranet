const mongoose = require('../database')

const PhotoPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
  active: { type: Boolean, default: true },
  createAt: { type: Date, default: Date.now }
}, {
  toJSON: {
      virtuals: true,
  }
})

PhotoPostSchema.virtual('file_url').get(function() {
  return `http://${process.env.HOSTPORT}/files/photos-caroussel/${this.file}`
})

module.exports = mongoose.model('PhotoPost', PhotoPostSchema)