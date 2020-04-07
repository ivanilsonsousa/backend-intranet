const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')
const uploadConfigCaroussel = require('./config/uploadCaroussel')
const uploadConfigVideo = require('./config/uploadVideo')
const makeDir = require('./config/makeDir')
const deleteDir = require('./config/deleteDir')
const renameDir = require('./config/renameDir')

const LoginController = require('./controllers/LoginController')
const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')
const FolderController = require('./controllers/FolderController')
const DocumentController = require('./controllers/DocumentController')
const PhotoPostController = require('./controllers/PhotoPostController')
const VideoController = require('./controllers/VideoController')
const PhoneController = require('./controllers/PhoneController')

const routes = express.Router()
const upload = multer(uploadConfig)
const uploadVideo = multer(uploadConfigVideo)
const uploadCaroussel = multer(uploadConfigCaroussel)

routes.post('/login', LoginController.auth)

routes.get('/posts', PostController.index)
routes.get('/posts/:qtd', PostController.show)
routes.post('/posts', PostController.store)
routes.put('/posts/:id', PostController.update)
routes.delete('/posts/:id', PostController.destroy)

routes.get('/posts-caroussel', PhotoPostController.index)
routes.get('/posts-caroussel-list', PhotoPostController.show)
routes.put('/posts-caroussel/:id', PhotoPostController.update)
routes.delete('/posts-caroussel/:id',PhotoPostController.destroy)
routes.post('/posts-caroussel', uploadCaroussel.single('file'), PhotoPostController.store)

routes.get('/videos', VideoController.index)
routes.get('/videos-list', VideoController.show)
routes.put('/videos/:id', VideoController.update)
routes.delete('/videos/:id',VideoController.destroy)
routes.post('/videos', uploadVideo.single('file'), VideoController.store)

routes.get('/users', UserController.index)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)
routes.post('/users', UserController.store)

routes.get('/phones', PhoneController.index)
routes.get('/phones-list', PhoneController.show)
routes.put('/phones/:id', PhoneController.update)
routes.delete('/phones/:id',PhoneController.destroy)
routes.post('/phones', PhoneController.store)

routes.get('/documents/', DocumentController.index)
routes.get('/documents/:parent', DocumentController.show)
routes.put('/documents/:id', renameDir, DocumentController.update)
routes.delete('/documents/:id', deleteDir, DocumentController.destroy)
routes.post('/documents', upload.single('file'), DocumentController.store)

routes.post('/folders', makeDir, FolderController.store)

module.exports = routes