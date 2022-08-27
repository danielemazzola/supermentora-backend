import express from 'express'
import dotenv from 'dotenv'
import connectionDB from './config/db.js'
import AdminRoutes from './routes/admin/AdminRoutes.js'
import UserRouter from './routes/UserRoutes.js'
import FormLevelRoutes from './routes/FormLevelRoutes.js'

// Configuracion de Express
const app = express()
app.use(express.json())
dotenv.config()
connectionDB()

// ROUTES
app.get('/', (req, res) => {
  res.send('<h1>Tu Supermentora API ;), no todos tienen acceso aquí..</h1>')
})
app.use('/api/admin', AdminRoutes)
app.use('/api/user', UserRouter)
app.use('/api/form', FormLevelRoutes)

// PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Puerto asignado=  ${PORT}`)
})
