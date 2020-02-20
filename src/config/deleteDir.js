const Document = require('../models/Document')
const rimraf = require("rimraf")
const path = require('path')

module.exports = async function deleteDir(req, res, next) {
  const document = await Document.findById( req.params.id )
  const dir = path.resolve(`${__dirname}/../../uploads/${document.dir}/`)

  rimraf(dir, () => next())
}