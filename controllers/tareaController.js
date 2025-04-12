const Tarea = require('../models/Tarea')


exports.crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea({ ...req.body, usuario: req.usuario._id })
    await nuevaTarea.save()
    res.status(201).json(nuevaTarea)
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear tarea' })
  }
}

exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ usuario: req.usuario._id })
    res.json(tareas)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener tareas' })
  }
}

exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuario._id },
      req.body,
      { new: true }
    )
    if (!tarea) return res.status(404).json({ msg: 'Tarea no encontrada' })
    res.json(tarea)
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar tarea' })
  }
}

exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndDelete({ _id: req.params.id, usuario: req.usuario._id })
    if (!tarea) return res.status(404).json({ msg: 'Tarea no encontrada' })
    res.json({ msg: 'Tarea eliminada' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar tarea' })
  }
}
