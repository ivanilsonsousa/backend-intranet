const Post = require('../models/Post')

module.exports = {
    async store(req, res) {
      
      try {
        const post = await Post.create(req.body)

        return res.send( post )
      } catch(err) {
        return res.status(400).send({ error: "Erro ao registrar: "+err })
      }
    }
}
