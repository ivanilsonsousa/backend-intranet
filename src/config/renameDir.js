const Document = require('../models/Document')
const { getDirDoc } = require('./getDir')
const path = require('path')
const fs = require('fs')

module.exports = async function renameDir(req, res, next) {
  const { title } = req.body
  const document = await Document.findById(req.params.id)

  if (document.type === 'file') 
    return next()

  getDirDoc(document).then(response => {
    const dir = path.resolve(`${__dirname}/../../uploads/${response.directory}`)
    const newDir = `${dir.substr(0, dir.lastIndexOf('\\'))}\\${title.trim()}`

    if (fs.existsSync(dir)) {
      fs.rename(dir, newDir, function(err) {
        if(err) {
          // throw err;	
          console.log(err)
        } else {
          console.log('Arquivo renomeado!');
          next()
        }
      })
    } else {
      console.log("Diretorio não existe...")
      next()
      return res.status(409).json({ message: "Esse diretório não existe no diretório informado!" })
    }

  })
}