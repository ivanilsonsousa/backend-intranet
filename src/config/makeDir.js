const path = require('path')
const fs = require('fs')


module.exports = function makeDir(req, res, next) {
  const dir = path.resolve(`${__dirname}/../../uploads/${req.headers.folder}/`)

  if (!fs.existsSync(dir)){
    //Efetua a criação do diretório
    fs.mkdirSync(dir);
  }

  console.log("pasouuuuuu")
  next()
}