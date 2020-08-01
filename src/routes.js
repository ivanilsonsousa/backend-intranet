const express = require('express')
const multer = require('multer')

const authMiddleware = require('./middlewares/auth')

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
routes.get('/authenticate', authMiddleware, LoginController.isAuthenticate)

routes.get('/posts', PostController.index)
routes.get('/posts/:qtd', PostController.show)
routes.post('/posts', authMiddleware, PostController.store)
routes.put('/posts/:id', authMiddleware, PostController.update)
routes.delete('/posts/:id', authMiddleware, PostController.destroy)

routes.get('/posts-caroussel', authMiddleware, PhotoPostController.index)
routes.get('/posts-caroussel-list', PhotoPostController.show)
routes.put('/posts-caroussel/:id', authMiddleware, PhotoPostController.update)
routes.delete('/posts-caroussel/:id', authMiddleware, PhotoPostController.destroy)
routes.post('/posts-caroussel', authMiddleware, uploadCaroussel.single('file'), PhotoPostController.store)

routes.get('/videos', VideoController.index)
routes.get('/videos-list', VideoController.show)
routes.put('/videos/:id', authMiddleware, VideoController.update)
routes.put('/videos-add-view/:id', VideoController.addView)
routes.delete('/videos/:id', authMiddleware, VideoController.destroy)
routes.post('/videos', authMiddleware, uploadVideo.single('file'), VideoController.store)

routes.get('/users', authMiddleware, UserController.index)
routes.put('/users/:id', authMiddleware, UserController.update)
routes.put('/users-reset-pass/:id', authMiddleware, UserController.resetPass)
routes.delete('/users/:id', authMiddleware, UserController.destroy)
routes.post('/users', authMiddleware, UserController.store)

routes.get('/phones', authMiddleware, PhoneController.index)
routes.get('/phones-list', PhoneController.show)
routes.put('/phones/:id', authMiddleware, PhoneController.update)
routes.delete('/phones/:id', authMiddleware, PhoneController.destroy)
routes.post('/phones', authMiddleware, PhoneController.store)

routes.get('/documents/', DocumentController.index)
routes.get('/documents/:parent', DocumentController.show)
routes.put('/documents/:id', renameDir, DocumentController.update)
routes.delete('/documents/:id', deleteDir, DocumentController.destroy)
routes.post('/documents', upload.single('file'), DocumentController.store)

routes.post('/folders', makeDir, FolderController.store)

module.exports = routes