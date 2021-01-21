const Pop = require('../models/Pop');
// const { getDirDocuments } = require('../config/getDir');

module.exports = {
    async index(req, res) {
      const pop = await Pop.find();

      return res.json(pop);
    },
    async show(req, res) {
      let { query } = req.query;

      const pops = await Pop.find({ title: new RegExp(query, 'i') }); 

      let i = 0;

      const foundParent = (parent) => {
        let i = 0;

        while(i < pops.length) {
          if(pops[i].parent === parent) return true;

          i++;
        }

        return false;
      }

      const foundElement = (id) => {
        let i = 0;

        while(i < pops.length) {
          if(String(pops[i]._id) == String(id)) return true;

          i++;
        }

        return false;
      }

      const pushElement = (el) => {

        if (foundElement(el._id)) {
          return;
        }

        pops.push(el);
      }

      while(i < pops.length) {        
        const notExistsParent = foundParent(pops[i].parent);

        if((pops[i].parent !== 'root') && (notExistsParent)) {
          const parent = await Pop.findById(pops[i].parent);
          
          pushElement(parent);
        }

        i++;
      }

      const idsPops = pops.map(e => e._id);

      const popsWithParents = await Pop.find({ _id: { $in: idsPops } }).sort({ 'type':  -1 , 'title': 1, 'file': 1 });

      return res.send(popsWithParents);
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