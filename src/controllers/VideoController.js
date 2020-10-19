const Video = require('../models/Video');

module.exports = {
    async index(req, res) {
      const { query, pageNumber, limit } = req.query;

      let pageOptions = {
          page: pageNumber || 0,
          limit: limit || 20
      };

      const video = await Video.
                            find({ title: new RegExp(query, 'i') })
                            .skip(pageOptions.page * pageOptions.limit)
                            .limit(pageOptions.limit);

      return res.json(video);
    },
    async show(req, res) {
      const video = await Video.find({ active: true });

      return res.json(video);
    },
    async update(req, res) {
      const { id } = req.params;
      const thumb = req.file;
      const { title, description, company } = req.body;

      const videoUpdate = { title, description, company };

      if(thumb) videoUpdate.thumb = thumb.filename;

      await Video.findByIdAndUpdate(id, videoUpdate);
      const video = await Video.findById(id);

      return res.json(video);
    },
    async store(req, res) {
      const { file, thumb } = req.files;
      const { title, description, company } = req.body;

      const video = await Video.create({
        title,
        company,
        description,
        file: file[0].filename,
        thumb: thumb[0].filename,
      });

      return res.json(video);
    },
    async destroy(req, res) {
      const { id } = req.params;

      const video = await Video.findByIdAndDelete(id);

      return res.json(video);
    },
    async addView(req, res) {
      const { id } = req.params;

      let video = await Video.findById(id);

      let views = ++video.views;

      await Video.findByIdAndUpdate(id, { views });

      return res.json({ status: `View adicionada com sucesso ao video ${id}` });
    },
}