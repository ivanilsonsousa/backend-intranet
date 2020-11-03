const Photo = require('../models/Photo');
const rimraf = require('rimraf');
const path = require('path');

async function deletePhoto(req, res, next) {
  const photo = await Photo.findById(req.params.id);
  const dirPhotoFile = path.resolve(__dirname, '..', '..', '..', 'uploads', 'photos-intranet', photo.file);

  rimraf(dirPhotoFile, () => next());
}

module.exports = { deletePhoto };