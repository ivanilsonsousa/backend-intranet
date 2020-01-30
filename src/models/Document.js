const mongoose = require('../database')

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String },
  type: { type: String },
  dir: {type: String },
  parent: {type: String, required: true },
  createAt: { type: Date, default: Date.now }
}, {
  toJSON: {
      virtuals: true,
  }
})

DocumentSchema.virtual('file_url').get(function() {
  return this.type === 'folder' ? 'directory' : `http://10.1.3.119:3333/files${this.dir}/${this.file}`
})

module.exports = mongoose.model('Document', DocumentSchema)