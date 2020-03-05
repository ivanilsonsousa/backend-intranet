const Document = require('../models/Document')
const { getDirDoc } = require('./getDir')
const path = require('path')
const fs = require('fs')

module.exports = async function makeDir(req, res, next) {
  const document = req.body.parent == 'root' ? null : await Document.findById(req.body.parent)
  const { title } = req.body

  getDirDoc(document).then(response => {
    const dir = path.resolve(`${__dirname}/../../uploads${document ? `/${response.directory}` : ''}/${title}`)
    
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  
    next()
  })
}