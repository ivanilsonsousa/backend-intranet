const mongoose = require('../database')

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
  dir: {type: String, required: true },
  parent: {type: String, required: true },
  createAt: { type: Date, default: Date.now }
}, {
  toJSON: {
      virtuals: true,
  }
})

DocumentSchema.virtual('file_url').get(function() {
  return `http://localhost:3333/files${this.dir}/${this.file}`
})

module.exports = mongoose.model('Document', DocumentSchema)