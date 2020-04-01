const User = require('../models/User')

module.exports = {
    async index(req, res) {
      const { query } = req.query

      const user = await User.find({ $or: [
        { name: new RegExp(query, 'i') },
        { username: new RegExp(query, 'i') }
      ]})
      
      return res.json(user)
    },
    async show(req, res) {
      let { qtd } = req.params

      const user = await User.find({ active: true }).limit(parseInt(qtd, 10))

      return res.json(user)
    },
    async store(req, res) {
      const { username, email } = req.body
      
      const exists = await User.find({ $or: [
        { username },
        { email },
      ] }).countDocuments()
      
      if(!exists) {
        const user = await User.create(req.body)
        
        return res.json(user)
      } else {
        return res.status(409).json({ message: "Esse usuário já existe!" })
      }

    },
    async update(req, res) {
      const { id } = req.params
      const { username, email, active } = req.body

      const exists = await User.find({ $or: [
        { username },
        { email },
      ] })

      console.log(active)

      if(((exists.length === 1) && (exists[0]._id == id)) || (active !== undefined)) {
        const user = await User.findByIdAndUpdate(id, req.body )
        
        return res.json(user)
      } else {
        return res.status(409).json({ message: "Esse usuário já existe!" })
      }
    },
    async destroy(req, res) {
      const { id } = req.params

      const user = await User.findByIdAndDelete(id)

      return res.json(user)
    },
}
