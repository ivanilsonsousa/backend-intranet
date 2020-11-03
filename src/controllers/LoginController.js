const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = {
  async auth(req, res) {
    let { user, password } = req.body

    if (user)
      user = user.toLowerCase()

    const login = await User.findOne({
      $and: [
        { $or: [{ username: user }, { email: user }] },
        { active: true },
        { password }
      ]
    })

    if (login === null)
      return res.json({ message: "Usuário e/ou senha incorretos ou inativo" })

    delete (login.password);

    const token = jwt.sign({ id: login._id }, authConfig.secret, {
      expiresIn: 86400,
    })

    return res.json({ login, token })
  },
  async isAuthenticate(req, res) {
    return res.json({ status: "ok" })
  }
}
