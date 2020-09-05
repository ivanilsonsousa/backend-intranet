const Video = require('../models/Video');
const rimraf = require('rimraf');
const path = require('path');

async function deleteVideo(req, res, next) {
  const video = await Video.findById( req.params.id );

  const dirVideoFile = path.resolve(`${__dirname}/../../uploads/videos-intranet/${video.file}`);
  const dirThumbFile = path.resolve(`${__dirname}/../../uploads/videos-intranet/thumbs/${video.thumb}`);

  rimraf(dirThumbFile, () => {
    rimraf(dirVideoFile, () => next());
  });
}

module.exports = { deleteVideo };