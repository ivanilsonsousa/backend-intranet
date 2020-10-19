const Photo = require('../models/Photo');

module.exports = {
    async index(req, res) {
      const { query, pageNumber, limit } = req.query;

      let pageOptions = {
          page: pageNumber || 0,
          limit: limit || 20
      };

      const photo = await Photo.
                            find({ title: new RegExp(query, 'i') })
                            .skip(pageOptions.page * pageOptions.limit)
                            .limit(pageOptions.limit).sort({ createAt: -1 });

      return res.json(photo);
    },
    async show(req, res) {
      const photo = await Photo.find({ active: true });

      return res.json(photo);
    },
    async update(req, res) {
      const { id } = req.params;
      const { title } = req.body;
      console.log(id, title);

      await Photo.findByIdAndUpdate(id, { title });
      const photo = await Photo.findById(id);

      return res.json(photo);
    },
    async store(req, res) {
      const { filename } = req.file;
      const { title } = req.body;

      const photo = await Photo.create({
        title,
        file: filename,
      });

      return res.json(photo);
    },
    async destroy(req, res) {
      const { id } = req.params;

      const photo = await Photo.findByIdAndDelete(id);

      return res.json(photo);
    }
}