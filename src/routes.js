const express = require('express');
const multer = require('multer');

const authMiddleware = require('./middlewares/auth');

const uploadConfig = require('./config/upload');
const uploadConfigCaroussel = require('./config/uploadCaroussel');
const uploadConfigVideo = require('./config/uploadVideo');
const uploadConfigPhoto = require('./config/uploadPhoto');
const uploadConfigVideoEdit = require('./config/uploadVideoEdit');
const uploadConfigPop = require('./config/uploadPop');
const uploadConfigLink = require('./config/uploadLink');

const { deleteVideo, deleteThumbnail } = require('./middlewares/Video');
const { deletePhoto } = require('./middlewares/Photo');

const LoginController = require('./controllers/LoginController');
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');
const PopController = require('./controllers/PopController');
const LinkController = require('./controllers/LinkController');
const DocumentController = require('./controllers/DocumentController');
const PhotoPostController = require('./controllers/PhotoPostController');
const PhotoController = require('./controllers/PhotoController');
const VideoController = require('./controllers/VideoController');
const PhoneController = require('./controllers/PhoneController');
const MessagePopupController = require('./controllers/MessagePopupController');
const BirthdaysController = require('./controllers/BirthdaysController');

const routes = express.Router();
const upload = multer(uploadConfig);
const uploadPhoto = multer(uploadConfigPhoto);
const uploadPop = multer(uploadConfigPop);
const uploadLink = multer(uploadConfigLink);
const uploadVideo = multer(uploadConfigVideo);
const uploadCaroussel = multer(uploadConfigCaroussel);
const uploadEditThumb = multer(uploadConfigVideoEdit);

routes.post('/login', LoginController.auth);
routes.get('/authenticate', authMiddleware, LoginController.isAuthenticate);

routes.get('/popups', MessagePopupController.show);
routes.post('/popus', MessagePopupController.store);

routes.get('/posts', authMiddleware, PostController.index);
routes.get('/posts-list', PostController.show);
routes.post('/posts', authMiddleware, PostController.store);
routes.put('/posts/:id', authMiddleware, PostController.update);
routes.delete('/posts/:id', authMiddleware, PostController.destroy);

routes.get('/posts-caroussel', authMiddleware, PhotoPostController.index);
routes.get('/posts-caroussel-list', PhotoPostController.show);
routes.put('/posts-caroussel/:id', authMiddleware, PhotoPostController.update);
routes.delete('/posts-caroussel/:id', authMiddleware, PhotoPostController.destroy);
routes.post('/posts-caroussel', authMiddleware, uploadCaroussel.single('file'), PhotoPostController.store);

routes.get('/videos', VideoController.index);
routes.get('/videos-list', VideoController.show);
routes.put('/videos/:id', authMiddleware, deleteThumbnail, uploadEditThumb.single('thumb'), VideoController.update);
routes.put('/videos-add-view/:id', VideoController.addView);
routes.delete('/videos/:id', authMiddleware, deleteVideo, VideoController.destroy);
routes.post('/videos', authMiddleware, uploadVideo.fields([{ name:'file', maxCount: 1 }, { name:'thumb', maxCount: 1 }]), VideoController.store);

routes.get('/photos', PhotoController.index);
routes.post('/photos', uploadPhoto.single('file'), PhotoController.store);
routes.put('/photos/:id', PhotoController.update);
routes.delete('/photos/:id', deletePhoto, PhotoController.destroy);

routes.get('/users', authMiddleware, UserController.index);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.put('/users-reset-pass/:id', authMiddleware, UserController.resetPass);
routes.delete('/users/:id', authMiddleware, UserController.destroy);
routes.post('/users', authMiddleware, UserController.store);

routes.get('/phones', authMiddleware, PhoneController.show);
routes.get('/phones-list', PhoneController.index);
routes.put('/phones/:id', authMiddleware, PhoneController.update);
routes.delete('/phones/:id', authMiddleware, PhoneController.destroy);
routes.post('/phones', authMiddleware, PhoneController.store);

routes.get('/documents/', DocumentController.index);
routes.get('/documents/:parent', DocumentController.show);
routes.put('/documents/:id', DocumentController.update);
routes.delete('/documents/:id', DocumentController.destroy);
routes.post('/documents', upload.array('files'), DocumentController.store);
routes.post('/documents/:parent', DocumentController.store);

routes.get('/pops/', PopController.index);
routes.get('/pops/:parent', PopController.show);
routes.put('/pops/:id', PopController.update);
routes.delete('/pops/:id', PopController.destroy);
routes.post('/pops', uploadPop.array('files'), PopController.store);
routes.post('/pops/:parent', PopController.store);

// routes.get('/links/', PopController.index);
// routes.put('/links/:id', PopController.update);
// routes.delete('/links/:id', PopController.destroy);
routes.post('/links', uploadLink.single('file'), LinkController.store);

routes.get('/birthdays', BirthdaysController.index);

module.exports = routes;