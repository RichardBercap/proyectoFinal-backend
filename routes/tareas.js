const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea
} = require('../controllers/tareaController')

router.use(auth) // proteger todas las rutas

router.get('/', obtenerTareas)
router.post('/', crearTarea)
router.put('/:id', actualizarTarea)
router.delete('/:id', eliminarTarea)

module.exports = router
