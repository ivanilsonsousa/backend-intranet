const Document = require('../models/Document')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

function makeDir(folder) {
  const dir = path.resolve(`${__dirname}/../../uploads/${folder}/`)

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

}

module.exports = {
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
          const { parent } = req.body
          const document = await Document.find({ _id: { $eq: parent } })
          const folder = document[0].dir

          req.body.dir = `/${folder}`
          makeDir(folder)
          
          cb(null, path.resolve(__dirname, '..', '..', 'uploads', `${folder}`))
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname)
          req.body.format = ext
          const name = path.basename(file.originalname, ext)

          cb(null, `${name}-${Date.now()}${ext}`)
        }
    }),
}