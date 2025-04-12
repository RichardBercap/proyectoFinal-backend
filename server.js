const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const tareaRoutes = require('./routes/tareas')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado a MongoDB')
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`))
  })
  .catch((err) => console.error('🔴 Error conectando a MongoDB:', err))
