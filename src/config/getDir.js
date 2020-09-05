const Document = require('../models/Document');

async function getDirDocuments(documents) {
  let query;
  
  const promises = documents.map(async element => {
    let parent = element.parent;
    let dir = element.type === 'folder' ? element.title : '';

    while(parent != 'root') {
      query = await Document.findById(parent);
      parent = query.parent;
      dir = `${query.title}/${dir}`;
    }

    let doc = { ...element["_doc"], "directory": dir };

    if(element.type === 'file')
      doc.url = `http://${process.env.HOSTPORT}/files/${dir}${element.file}`;

    return doc;
  })

  return Promise.all(promises).then(function(results) {
    return results;
  })
}

async function getDirDoc(document) {
  if(!document)
    return {};

  let parent = document.parent;
  let dir = document.type === 'folder' ? document.title : '';

  while(parent != 'root') {
    query = await Document.findById(parent);
    parent = query.parent;
    dir = `${query.title}/${dir}`;
  }

  let doc = { ...document["_doc"], "directory": dir };

  if(document.type === 'file')
    doc.url = `http://${process.env.HOSTPORT}/files/${dir}${document.file}`;

  return doc;
}

module.exports = { getDirDoc, getDirDocuments };