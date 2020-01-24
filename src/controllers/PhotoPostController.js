const PhotoPost = require('../models/PhotoPost')

module.exports = {
    async index(req, res) {
      const photoPost = await PhotoPost.find()

      return res.json(photoPost)
    },
    async store(req, res) {
      const { filename } = req.file
      const { title } = req.body

      const photoPost = await PhotoPost.create({
        title,
        file: filename,
      })

      return res.json(photoPost)
  }
}