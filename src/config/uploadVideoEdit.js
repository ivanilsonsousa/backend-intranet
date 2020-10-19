const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {

      cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'videos-intranet', 'thumbs'));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  }),
};