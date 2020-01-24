const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const uploadConfigCaroussel = require('./config/uploadCaroussel')

const PostController = require('./controllers/PostController')
const PhotoPostController = require('./controllers/PhotoPostController')
const DocumentController = require('./controllers/DocumentController')

const routes = express.Router()
const upload = multer(uploadConfig)
const uploadCaroussel = multer(uploadConfigCaroussel)

routes.post('/posts', PostController.store)
routes.get('/posts', PostController.index)

routes.post('/posts-caroussel', uploadCaroussel.single('file'), PhotoPostController.store)
routes.get('/posts-caroussel', PhotoPostController.index)

routes.post('/documents', upload.single('file'), DocumentController.store)
routes.get('/documents/:parent', DocumentController.index)

module.exports = routes