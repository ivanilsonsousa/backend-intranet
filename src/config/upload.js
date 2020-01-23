const multer = require('multer')
const path = require('path')
const fs = require('fs')

function makeDir(folder) {
  const dir = path.resolve(`${__dirname}/../../uploads/${folder}/`)

  if (!fs.existsSync(dir)){
    //Efetua a criação do diretório
    fs.mkdirSync(dir);
  }

}

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const { folder } = req.headers

          req.body.dir = `/${folder}`
          makeDir(folder)
          
          cb(null, path.resolve(__dirname, '..', '..', 'uploads', `${folder}`))  
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname)
          const name = path.basename(file.originalname, ext)

          cb(null, `${name}-${Date.now()}${ext}`)
        }
    }),
}