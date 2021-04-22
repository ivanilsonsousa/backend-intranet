const mongoose = require('../database');

const PopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String },
  type: { type: String, required: true },
  parent: {type: String, required: true },
  createAt: { type: Date, default: Date.now }
}, {
  toJSON: {
      virtuals: true,
  }
});

PopSchema.virtual('file_url').get(function () {
  return this.type === 'file' ? `http://${process.env.HOSTPORT}/files/pops-intranet/${this.file}` : '';
});

module.exports = mongoose.model('Pop', PopSchema);