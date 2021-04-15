const Pop = require("../models/Pop");
const { getDirDoc } = require('../config/getDir');
const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { parent } = req.body;
      
      const result = await getDirDoc(parent, Pop);
      const dir = path.resolve(__dirname, '..', '..', '..', 'uploads', 'pops-intranet', ...result);

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowMimes = [
      'application/pdf'
    ];

    if (allowMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Mimetype não suportado"));
    }
  }
}