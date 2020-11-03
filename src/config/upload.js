const { getDirDoc } = require('../config/getDir');
const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { parent } = req.body;
      
      const result = await getDirDoc(parent);
      const dir = path.resolve(__dirname, '..', '..', '..', 'uploads', 'documentos', ...result);

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      req.body.format = ext;
      const name = path.basename(file.originalname, ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  }),
}