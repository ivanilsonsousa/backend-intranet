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
        const { dir: folder, title, parent } = req.headers

        const document = await Document.create({
          title,
          folder,
          parent,
          type,
        })

        return res.json(document)
    }
}