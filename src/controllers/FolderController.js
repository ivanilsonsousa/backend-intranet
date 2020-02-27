const Document = require('../models/Document')

module.exports = {
    async index(req, res) {
        const document = await Document.find({ parent: { $eq: req.params.parent } })

        console.log(req.params.parent)

        return res.json(document)
    },
    async store(req, res) {
        req.body.type = 'folder'
        const { type } = req.body
        const { dir: folder, title, parent, dir } = req.body

        const query = await Document.find({ title: title, parent: { $eq: parent } } ).countDocuments()

        if(query)
          return res.status(409).json({ message: "Essa pasta já existe!" })

        const document = await Document.create({
          title,
          folder,
          dir,
          parent,
          type,
        })

        return res.json(document)
    }
}