const Document = require('../models/Document')

/**
 * Methods of controllers index, show, store, update, destroy:
 * @index para listar todos os documentos de um Controller,
 * @show para listar apenas um documento de um controller,
 * @store para salvar um documento dentro do banco,
 * @update para atualizar um documento dentro do banco,
 * @destroy para remover um documento dentro do banco
 */

module.exports = {
    async index(req, res) {
        const document = await Document.find({ parent: { $eq: req.params.parent } })

        console.log(req.params.parent)

        return res.json(document)
    },
    async store(req, res) {
        req.body.type = 'file'
        const { filename } = req.file
        const { title, dir, parent, type } = req.body

        const document = await Document.create({
          title,
          dir,
          parent,
          type,
          file: filename,
        })

        return res.json(document)
    }
}