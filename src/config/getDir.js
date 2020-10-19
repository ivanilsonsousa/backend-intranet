const Document = require('../models/Document');

async function getDirDoc(firstParent) {
  const document = firstParent === 'root' ? null : await Document.findById(firstParent);
  const pathDoc = [];

  if (firstParent === 'root') return pathDoc;

  let { parent, type, title } = document;

  if (type === 'folder')
    pathDoc.unshift(title);

  while (parent != 'root') {
    query = await Document.findById(parent);
    parent = query.parent;
    pathDoc.unshift(query.title);
  }

  return pathDoc;
}

async function getDirDocuments(documents) {
  const promises = documents.map(async element => {
    const { parent, type, file } = element;

    const pathDoc = await getDirDoc(parent);
    const directory = pathDoc.join('/');

    let doc = { ...element["_doc"], "directory": directory };

    if (type === 'file') {
      doc.url = `http://${process.env.HOSTPORT}/documents/${directory}/${file}`;
    }

    return doc;
  })

  return Promise.all(promises).then(results => results);
}

module.exports = { getDirDoc, getDirDocuments };