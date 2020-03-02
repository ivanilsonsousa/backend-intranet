const Document = require('../models/Document')
const getDir = require('../config/getDir')

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
        const document = await Document.find()

        return res.json(document)
    },
    async show(req, res) {
        const document = await Document.find({ parent: { $eq: req.params.parent } }).sort( { "type":  -1 , "title": 1, "file": 1 } )

        const response = document.map(element => getDir(element).then(e => e))

        return res.json(response)
    },
    async destroy(req, res) {
        const document = await Document.findById(req.params.id)

        let idsDelete = [document._id]
        let idsSearch = idsDelete

        do {
          childrens = await Document.find( { parent: { $in: idsSearch } } )
          idsSearch = childrens.map(e => e._id)
          idsDelete = [...idsDelete, ...idsSearch]
        } while (idsSearch.length)

        const response = await Document.deleteMany( { _id: { $in: idsDelete } } )

        return res.json(response)
    },
    async store(req, res) {
        req.body.type = 'file'
        const { filename } = req.file
        const { title, parent, type, dir, format } = req.body
        
        const document = await Document.create({
          title,
          dir,
          parent,
          format,
          type,
          file: filename,
        })

        return res.json(document)
    }
}