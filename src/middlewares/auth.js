const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const User = require('../models/User')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Token de autenticação não informado' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token de autenticação com erro' });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ error: 'Token de autenticação mal formatado' });

  jwt.verify(token, authConfig.secret, async (err, decode) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });
    
    const user = await User.findById(decode.id);

    if (!user.active)
      return res.status(401).send({ error: 'Usuário inativo' });

    req.userId = decode.id;

    return next();
  })
}