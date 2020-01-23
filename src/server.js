const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const routes = require('./routes')
const app = express()

app.set('trust proxy', true)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.get('/meu-ip', (req, res) => {
  const ip = req.ip.split(':').pop()

  res.send({ ip })
})

app.listen(3333)