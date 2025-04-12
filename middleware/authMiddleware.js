const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuarios')

const verificarToken = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) return res.status(401).json({ msg: 'No token, acceso denegado' })

  try {
    const { id } = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
    req.usuario = await Usuario.findById(id).select('-password')
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' })
  }
}

module.exports = verificarToken
