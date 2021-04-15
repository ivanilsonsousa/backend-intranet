async function getDirDoc(firstParent, Model) {
  const document = firstParent === 'root' ? null : await Model.findById(firstParent);
  const pathDoc = [];

  if (firstParent === 'root') return pathDoc;

  let { parent, type, title } = document;

  if (type === 'folder')
    pathDoc.unshift(title);

  while (parent != 'root') {
    query = await Model.findById(parent);
    parent = query.parent;
    pathDoc.unshift(query.title);
  }

  return pathDoc;
}

async function getDirDocuments(documents, path, Model) {
  const promises = documents.map(async element => {
    const { parent, type, file } = element;

    const pathDoc = await getDirDoc(parent, Model);
    const directory = pathDoc.join('/');

    let doc = { ...element["_doc"], "directory": directory };

    if (type === 'file') {
      doc.url = `http://${process.env.HOSTPORT}/${path}/${directory}/${file}`;
    }

    return doc;
  })

  return Promise.all(promises).then(results => results);
}

module.exports = { getDirDoc, getDirDocuments };