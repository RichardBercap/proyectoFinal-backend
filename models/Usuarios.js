const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    password: {
        type: String,
        required: true
      }
});

UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  })

  UsuarioSchema.methods.compararPassword = function (password) {
    return bcrypt.compare(password, this.password)
  }
  


module.exports = mongoose.model('Usuario', UsuarioSchema)