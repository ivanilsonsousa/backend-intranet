async function getBreadCrumb(id, breadCrumb, Model) {
  let bread = breadCrumb;

  if (id === "root") {
    bread.unshift({ parent: "root", legend: "Início" });

    return bread;
  }
  
  const document = await Model.findById(id);

  bread.unshift({ parent: document._id, legend: document.title });

  return getBreadCrumb(document.parent, bread, Model);
}

function getExt(nameFile) {
  let separator = nameFile.lastIndexOf('.');
  let nameFileLength = nameFile.length;
  let ext = String(nameFile.substr(separator, nameFileLength)).toLowerCase();

  return separator <= 0 ? '' : ext;
}

function getNameWithOutExt(nameFile) {
  let separator = nameFile.lastIndexOf('.');

  return separator <= 0 ? nameFile : nameFile.substr(0, separator);
}

module.exports = { getBreadCrumb, getExt, getNameWithOutExt };