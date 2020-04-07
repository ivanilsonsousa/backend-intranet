const User = require('../models/User')

module.exports = {
    async auth(req, res) {
      let { user, password } = req.body

      user = user.toLowerCase()

      const login = await User.findOne({
        $and: [
          { $or: [{ username: user }, { email: user }] },
          { active: true },
          { password }
      ]})

      if(login === null)
        return res.json({ message: "Usuário e/ou senha incorretos" })

      return res.json(login)
    },
}
