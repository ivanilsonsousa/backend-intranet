const Pop = require('../models/Pop');
// const { getDirDocuments } = require('../config/getDir');

module.exports = {
    async index(req, res) {
      const pop = await Pop.find();

      return res.json(pop);
    },
    async show(req, res) {
      const pops = await Pop.find().sort({ 'type':  -1 , 'title': 1, 'file': 1 });

      let index = 0;

      while(index < pops.length) {
        console.log(index);

        if ((index === 15) || (index === 16)) {
          pops.push({ "A": "B" })
        }

        //implementar busca de elementos pais não achados na busca inicial

        console.log(index, " - ", pops[index])

        index++;
      }

      // console.log(pops)

      return res.send(pops);
    },
    async destroy(req, res) {
        // const document = await Document.findById(req.params.id);

        // let idsDelete = [document._id];
        // let idsSearch = idsDelete;

        // do {
        //   childrens = await Document.find({ parent: { $in: idsSearch } });
        //   idsSearch = childrens.map(e => e._id);
        //   idsDelete = [...idsDelete, ...idsSearch];
        // } while (idsSearch.length);

        // const response = await Document.deleteMany({ _id: { $in: idsDelete } });

        // return res.json(response);
    },
    async update(req, res) {
      // const { title } = req.body;
      // const document = await Document.findByIdAndUpdate({ _id: req.params.id }, { title });

      // return res.json(document);
    },
    async store(req, res) {
        // req.body.type = 'file';
        // const { filename } = req.file;
        const { parent } = req.params;
        const { title, file } = req.body;
        const type = !!file ? 'file' : 'folder';

        const pop = await Pop.create({
          title,
          parent,
          file,
          type,
        });

        return res.json(pop);
    }
}