const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')
const uploadConfigCaroussel = require('./config/uploadCaroussel')
const makeDir = require('./config/makeDir')
const deleteDir = require('./config/deleteDir')
const renameDir = require('./config/renameDir')

const PostController = require('./controllers/PostController')
const FolderController = require('./controllers/FolderController')
const DocumentController = require('./controllers/DocumentController')
const PhotoPostController = require('./controllers/PhotoPostController')

const routes = express.Router()
const upload = multer(uploadConfig)
const uploadCaroussel = multer(uploadConfigCaroussel)

routes.get('/posts', PostController.index)
routes.post('/posts', PostController.store)

routes.get('/posts-caroussel', PhotoPostController.index)
routes.post('/posts-caroussel', uploadCaroussel.single('file'), PhotoPostController.store)

routes.get('/documents/', DocumentController.index)
routes.get('/documents/:parent', DocumentController.show)
routes.put('/documents/:id', renameDir, DocumentController.update)
routes.delete('/documents/:id', deleteDir, DocumentController.destroy)
routes.post('/documents', upload.single('file'), DocumentController.store)

routes.post('/folders', makeDir, FolderController.store)

module.exports = routes