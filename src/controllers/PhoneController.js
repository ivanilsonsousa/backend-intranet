const Phone = require('../models/Phone')

module.exports = {
    async index(req, res) {
      const { query } = req.query
      console.log(query)

      const phone = await Phone.find({ $and: [ 
        { $or: [ { title: new RegExp(query, 'i') }, { description: new RegExp(query, 'i') }] },
        { active: true }]
      })
      
      return res.json(phone)
    },
    async show(req, res) {
      const { query } = req.query
      const phone = await Phone.find({ $or: [ { title: new RegExp(query, 'i') }, { description: new RegExp(query, 'i') }] })

      return res.json(phone)
    },
    async store(req, res) {
      const phone = await Phone.create(req.body)

      return res.json(phone)
    },
    async update(req, res) {
      const { id } = req.params

      const phone = await Phone.findByIdAndUpdate(id, req.body)

      return res.json(phone)
    },
    async destroy(req, res) {
      const { id } = req.params

      const phone = await Phone.findByIdAndDelete(id)

      return res.json(phone)
    },
}
