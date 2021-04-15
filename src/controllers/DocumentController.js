const Document = require("../models/Document");
const { getDirDocuments } = require("../config/getDir");
const { makeDir, renameDir, deleteDir } = require("../middlewares/Dir");
const { getBreadCrumb, getNameWithOutExt, getExt } = require("../functions");

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
      const document = await Document.find();

      return res.json(document);
    },
    async show(req, res) {
      const { parent } = req.params;

      const documents = await Document
                                      .find({ parent: { $eq: parent } })
                                      .sort({ "type":  -1 , "title": 1, "file": 1 });

      const bread = await getBreadCrumb(parent, [], Document);

      const result = await getDirDocuments(documents, "documents", Document);
      return res.json({ result, bread });
    },
    async destroy(req, res) {
      const { id } = req.params;
      const document = await Document.findById(id);

      const status = await deleteDir("documentos", id, Document);

      let idsDelete = [document._id];
      let idsSearch = idsDelete;

      do {
        childrens = await Document.find({ parent: { $in: idsSearch } });
        idsSearch = childrens.map(e => e._id);
        idsDelete = [...idsDelete, ...idsSearch];
      } while (idsSearch.length);

      const response = await Document.deleteMany({ _id: { $in: idsDelete } });

      return res.json(response);
    },
    async update(req, res) {
      const { title } = req.body;
      const { id } = req.params;

      const status = await renameDir("documentos", title, id, Document);

      console.log("status::", status);

      const document = await Document.findByIdAndUpdate(id, { title });
  
      return res.json(document);
    },
    async store(req, res) {
      const { files } = req;
      const { parent } = req.params;
      const { title, parent: parent_file, type } = req.body;

      let document;

      if (type === 'file') {

        files.map(async file => {
          let filename = getNameWithOutExt(file.originalname);
          let format = getExt(file.originalname);

          document = await Document.create({
            title: filename,
            parent: parent_file,
            file: file.filename,
            format,
            type,
          });
        })

      } else {
        const status = await makeDir("documentos", title, parent, Document);

        document = await Document.create({
          title,
          type: "folder",
          parent,
        });

      }

      return res.json(document);
    }
}