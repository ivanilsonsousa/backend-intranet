const Document = require('../models/Document')
const { getDirDoc } = require('./getDir')
const rimraf = require("rimraf")
const path = require('path')

module.exports = async function deleteDir(req, res, next) {
  const document = await Document.findById( req.params.id )

  getDirDoc(document).then(response => {
    const dir = path.resolve(`${__dirname}/../../uploads/${response.directory}/${response.type === 'file' ? response.file : ''}`)
    rimraf(dir, () => next())
  })
}