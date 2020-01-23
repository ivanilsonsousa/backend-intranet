const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const PostController = require('./controllers/PostController')
const DocumentController = require('./controllers/DocumentController')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.post('/posts', PostController.store)
routes.get('/posts', (req, res) => {
  return res.send("meu deus")
})

routes.post('/documents', upload.single('file'), DocumentController.store)
routes.get('/documents', DocumentController.index)

module.exports = routes