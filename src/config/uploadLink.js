const Pop = require("../models/Pop");
const { getDirDoc } = require('../config/getDir');
const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const dir = path.resolve(__dirname, '..', '..', '..', 'uploads', 'links');

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  }),
  // fileFilter: (req, file, cb) => {
  //   const allowMimes = [
  //     'image/*'
  //   ];

  //   if (allowMimes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Mimetype não suportado"));
  //   }
  // }
}