const Document = require('../models/Document')

module.exports = async function getDir(obj) {
  let parent = obj.parent
  let element, document = null
  let dir = obj.type === 'folder' ? obj.title : ''

  while(parent != 'root') {
    document = await Document.findById(parent)
    element = { ...document["_doc"] }
    parent = document.parent

    dir = `${document.title}/${dir}`
  }

  element.directory = dir

  console.log("*****a")
  console.log(dir)
  console.log("*****b")

  return element
}