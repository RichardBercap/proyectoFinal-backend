
const mongoose = require('mongoose')

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  completada: {
    type: Boolean,
    default: false,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)
