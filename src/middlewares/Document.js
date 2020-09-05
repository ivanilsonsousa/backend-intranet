const Document = require('../models/Document');
const { getDirDoc } = require('../config/getDir');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

async function makeDir(req, res, next) {
  const document = req.body.parent == 'root' ? null : await Document.findById(req.body.parent);
  const { title } = req.body;

  getDirDoc(document).then(response => {
    const dir = path.resolve(`${__dirname}/../../uploads${document ? `/${response.directory}` : ''}/${title}`);

    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, (err) => {
        if (err) {
          return res.status(409).json({ message: "Erro ao criar diretório!" });
        }

        console.log("Diretório criado com sucesso!");
        next();
      });
    } else {
      console.log("diretorio já existe...");
      return res.status(409).json({ message: "Essa pasta já existe no diretório informado!" });
    }
    
  })
}

async function renameDir(req, res, next) {
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

async function deleteDir(req, res, next) {
  const document = await Document.findById( req.params.id );

  getDirDoc(document).then(({ directory, type, file }) => {
    const dir = path.resolve(`${__dirname}/../../uploads/${directory}/${type === 'file' ? file : ''}`);
    rimraf(dir, () => next());
  });
}

module.exports = { makeDir, renameDir, deleteDir };