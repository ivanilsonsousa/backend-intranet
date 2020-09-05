const PhotoPost = require('../models/PhotoPost')

module.exports = {
    async index(req, res) {
      const { query } = req.query
      console.log(query)

      const photoPost = await PhotoPost.find({ title: new RegExp(query, 'i') }).sort({ createAt: -1 })
      
      return res.json(photoPost)
    },
    async show(req, res) {
      const photoPost = await PhotoPost.find({ active: true }).sort({ createAt: -1 })

      return res.json(photoPost)
    },
    async update(req, res) {
      const { id } = req.params
      console.log(req.body)

      const photoPost = await PhotoPost.findByIdAndUpdate(id, req.body )

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
    },
    async destroy(req, res) {
      const { id } = req.params

      const photoPost = await PhotoPost.findByIdAndDelete(id)

      return res.json(photoPost)
    },
}