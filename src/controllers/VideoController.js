const Video = require('../models/Video')

module.exports = {
    async index(req, res) {
      const { query } = req.query
      console.log(query)

      const video = await Video.find({ title: new RegExp(query, 'i') })
      
      return res.json(video)
    },
    async show(req, res) {
      const video = await Video.find({ active: true })

      return res.json(video)
    },
    async update(req, res) {
      const { id } = req.params
      console.log(req.body)

      const video = await Video.findByIdAndUpdate(id, req.body )

      return res.json(video)
    },
    async store(req, res) {
      const { filename } = req.file
      const { title, description, company } = req.body

      const video = await Video.create({
        title,
        company,
        description,
        file: filename,
      })

      return res.json(video)
    },
    async destroy(req, res) {
      const { id } = req.params

      const video = await Video.findByIdAndDelete(id)

      return res.json(video)
    },
    async addView(req, res) {
      const { id } = req.params

      let video = await Video.findById(id)

      let views = ++video.views

      await Video.findByIdAndUpdate(id, { views })

      return res.json({ status: "ok" })
    },
}