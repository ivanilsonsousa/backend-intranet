const Document = require('../models/Document')
const path = require('path')
const fs = require('fs')

module.exports = async function makeDir(req, res, next) {
  const document = req.body.parent == 'root' ? null : await Document.find({ _id: { $eq: req.body.parent } })

  const dir_parent = document ? document[0].dir : null
  const { folder } = req.body

  const new_path = dir_parent ? `${dir_parent}/${folder}` : folder

  req.body.dir = new_path

  const dir = path.resolve(`${__dirname}/../../uploads/${new_path}/`)

  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  next()
}