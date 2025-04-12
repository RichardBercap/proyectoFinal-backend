const Usuario = require('./../models/Usuarios');
const jwt = require('jsonwebtoken');


const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };
  


exports.registrar = async (req, res) => {
    try {
      const { nombre, email, password } = req.body
      const existe = await Usuario.findOne({ email })
      if (existe) return res.status(400).json({ msg: 'Ya existe un usuario con ese email' })
       
  
      const nuevoUsuario = new Usuario({ nombre, email, password })
      await nuevoUsuario.save()
  
      res.status(201).json({
        token: generarToken(nuevoUsuario._id),
        usuario: { id: nuevoUsuario._id, nombre, email }
      })
    } catch (err) {
        console.error('Error completo:', err)
      res.status(500).json({ msg: 'Error al registrar usuario' })
    }
  }


  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body
      const usuario = await Usuario.findOne({ email })
  
      if (!usuario || !(await usuario.compararPassword(password))) {
        return res.status(400).json({ msg: 'Credenciales incorrectas' })
      }
  
      res.json({
        token: generarToken(usuario._id),
        usuario: { id: usuario._id, nombre: usuario.nombre, email }
      })
    } catch (err) {
      res.status(500).json({ msg: 'Error al iniciar sesión' })
    }
  }