const Post = require('../models/Post')

module.exports = {
  async index(req, res) {
    const { query } = req.query
    console.log(query)

    const post = await Post.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
      ]
    })

    return res.json(post)
  },
  async show(req, res) {
    let { qtd } = req.params

    const post = await Post.find({ active: true }).sort({ createAt: -1 }).limit(parseInt(qtd, 10))

    return res.json(post)
  },
  async store(req, res) {
    const post = await Post.create(req.body)

    return res.json(post)
  },
  async update(req, res) {
    const { id } = req.params

    const post = await Post.findByIdAndUpdate(id, req.body)

    return res.json(post)
  },
  async destroy(req, res) {
    const { id } = req.params

    const post = await Post.findByIdAndDelete(id)

    return res.json(post)
  },
}
