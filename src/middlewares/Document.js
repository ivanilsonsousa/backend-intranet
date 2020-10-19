const Document = require('../models/Document');
const { getDirDoc } = require('../config/getDir')
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

async function makeDir(req, res, next) {
  const { title, parent } = req.body;

  const result = await getDirDoc(parent);

  const dir = path.resolve(__dirname, '..', '..', 'uploads', 'documentos', ...result, title.trim());

  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) return res.status(409).json({ message: "Erro ao criar diretório!" });

      next();
    });
  } else {
    return res.status(409).json({ message: "Essa pasta já existe no diretório informado!" });
  }

}

async function renameDir(req, res, next) {
  const { title } = req.body;
  const { id } = req.params;
  const document = await Document.findById(id);

  if (document.type === 'file')
    return next();

  const result = await getDirDoc(id);
  const dir = path.resolve(__dirname, '..', '..', 'uploads', 'documentos', ...result);
  result.pop();
  const newDir = path.resolve(__dirname, '..', '..', 'uploads', 'documentos', ...result, title.trim());

  if (fs.existsSync(dir)) {
    fs.rename(dir, newDir, function (err) {
      if (err) return res.status(409).json({ message: "Erro ao renomear o ficheiro" });

      console.log('Arquivo renomeado!', id);
      return next();
    })
  } else {
    return res.status(409).json({ message: "Esse diretório não existe!" });
  }
}

async function deleteDir(req, res, next) {
  const { id } = req.params;
  const document = await Document.findById(id);
  const result = await getDirDoc(id);

  const { file, type } = document;

  if (type === 'file')
    result.push(file);

  const dir = path.resolve(__dirname, '..', '..', 'uploads', 'documentos', ...result);
  rimraf(dir, () => next());

}

module.exports = { makeDir, renameDir, deleteDir };