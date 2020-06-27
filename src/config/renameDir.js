const Document = require('../models/Document')
const { getDirDoc } = require('./getDir')
const path = require('path')
const fs = require('fs')

module.exports = async function renameDir(req, res, next) {
  const { title } = req.body
  const document = await Document.findById(req.params.id)

  if (document.type === 'file')
    return next()

  const response = await getDirDoc(document)

  const dir = path.resolve(`${__dirname}/../../uploads/${response.directory}`)
  const newDir = `${dir.substr(0, dir.lastIndexOf('\\'))}\\${title.trim()}`

  if (fs.existsSync(dir)) {
    fs.rename(dir, newDir, function (err) {
      if (err) return res.status(409).json({ message: "Erro ao renomear o ficheiro" })

      console.log('Arquivo renomeado!');
      return next()
    })
  } else {
    return res.status(409).json({ message: "Esse diretório não existe no diretório informado!" })
  }
}