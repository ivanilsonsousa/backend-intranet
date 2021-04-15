const Pop = require('../models/Pop')

module.exports = {
    async index(req, res) {
        const pop = await Pop.find({ parent: { $eq: req.params.parent } })
        
        return res.json(pop)
    },
    async store(req, res) {
        req.body.type = 'folder'
        const { type } = req.body
        const { dir: folder, title, parent } = req.body

        const query = await Pop.find({ title: title, type: 'folder', parent: { $eq: parent } }).countDocuments()

        if (query)
          return res.status(409).json({ message: "Essa pasta já existe!" })

        const pop = await Pop.create({
          title,
          folder,
          parent,
          type,
        })

        return res.json(pop)
    }
}