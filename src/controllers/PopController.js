const Pop = require("../models/Pop");
const { getDirDocuments } = require("../config/getDir");
const { makeDir, renameDir, deleteDir } = require("../middlewares/Dir");
const { getBreadCrumb, getNameWithOutExt, getExt } = require("../functions");

module.exports = {
    async index(req, res) {
      const pop = await Pop.find();

      return res.json(pop);
    },
    async show(req, res) {
      const { parent } = req.params;

      const pops = await Pop
                            .find({ parent: { $eq: parent } })
                            .sort({ "type":  -1 , "title": 1, "file": 1 });

      const bread = await getBreadCrumb(parent, [], Pop);

      const result = await getDirDocuments(pops, "pops", Pop);

      return res.json({ result, bread });
    },
    async destroy(req, res) {
      const { id } = req.params;
      const pop = await Pop.findById(id);

      const status = await deleteDir("pops-intranet", id, Pop);

      let idsDelete = [pop._id];
      let idsSearch = idsDelete;

      do {
        childrens = await Pop.find({ parent: { $in: idsSearch } });
        idsSearch = childrens.map(e => e._id);
        idsDelete = [...idsDelete, ...idsSearch];
      } while (idsSearch.length);

      const response = await Pop.deleteMany({ _id: { $in: idsDelete } });

      return res.json(response);
    },
    async update(req, res) {
      const { title } = req.body;
      const { id } = req.params;

      const status = await renameDir("pops-intranet", title, id, Pop);

      console.log("status::", status);

      const pop = await Pop.findByIdAndUpdate(id, { title });
  
      return res.json(pop);
    },
    async store(req, res) {
      const { files } = req;
      const { parent } = req.params;
      const { title, parent: parent_file, type } = req.body;

      let pop;

      if (type === 'file') {

        files.map(async file => {
          let filename = getNameWithOutExt(file.originalname);
          let format = getExt(file.originalname);

          pop = await Pop.create({
            title: filename,
            parent: parent_file,
            file: file.filename,
            format,
            type,
          });
        })

      } else {
        const status = await makeDir("pops-intranet", title, parent, Pop);

        pop = await Pop.create({
          title,
          type: "folder",
          parent,
        });

      }

      return res.json(pop);
    }
}