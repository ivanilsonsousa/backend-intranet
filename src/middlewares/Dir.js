const { getDirDoc } = require('../config/getDir')
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

async function makeDir(pathRoot, title, parent, Model) {
  const result = await getDirDoc(parent, Model);

  const dir = path.resolve(__dirname, '..', '..', '..', 'uploads', pathRoot, ...result, title.trim());

  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) return { message: "Erro ao criar diretório!" };

      return { message: "Diretório criado com sucesso!" }
    });
  } else {
    return { message: "Essa pasta já existe no diretório informado!" };
  }

}

async function renameDir(pathRoot, title, id, Model) {
  const document = await Model.findById(id);
  let status = { };

  console.log("entrou aqui no renameDir");

  console.log("saiu do loop");

  if (document.type === 'file') {
    status = { code: 304, message: "Ficheiro do tipo file!", status: true };
    console.log("valor:", status);
    return status;
  }

  const result = await getDirDoc(id, Model);
  const dir = path.resolve(__dirname, '..', '..', '..', 'uploads', pathRoot, ...result);
  result.pop();

  const newDir = path.resolve(__dirname, '..', '..', '..', 'uploads', pathRoot, ...result, title.trim());

  if (fs.existsSync(dir)) {
    fs.rename(dir, newDir, function (err) {
      
      if (err) {
        status = { code: 500, message: "Erro ao renomear o ficheiro", status: false };
        console.log("valor:", status);
        return status; 
      } else {
        status = { code: 202, message: "Ficheiro renomeado com sucesso!", status: true };
        console.log("valor:", status);
        return status;
      }

    })
  } else {
    status = { code: 404, message: "Esse diretório não existe!", status: false };
    console.log("valor:", status);
    return status;
  }
}

async function deleteDir(pathRoot, id, Model) {
  const document = await Model.findById(id);
  const result = await getDirDoc(id, Model);

  const { file, type } = document;

  if (type === 'file')
    result.push(file);

  const dir = path.resolve(__dirname, '..', '..', '..', 'uploads', pathRoot, ...result);
  rimraf(dir, () => {
    
    return { code: 202, message: "Ficheiro deletado com sucesso!", status: true };
  });

}

module.exports = { makeDir, renameDir, deleteDir };