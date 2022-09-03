import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import connectionDB from './config/db.js'
import AdminRoutes from './routes/admin/AdminRoutes.js'
import UserRouter from './routes/UserRoutes.js'
import FormLevelRoutes from './routes/FormLevelRoutes.js'
import LandingRoutes from './routes/landingPage/LandingRoutes.js'

// Configuracion de Express
const app = express()
app.use(express.json())
dotenv.config()
connectionDB()

//conf CORS
const whiteList = [process.env.URL_FRONT, 'https://supermentora.netlify.app'];
const corsOption = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //puede consultar API
      callback(null, true);
    } else {
      //no puede consultar API
      callback(new Error("Error of the Cors"));
    }
  },
};
app.use(cors(corsOption));



// ROUTES
app.get('/', (req, res) => {
  res.send('<h1>Tu Supermentora API ;), no todos tienen acceso aquí..</h1>')
})
app.use('/api/admin', AdminRoutes)
app.use('/api/user', UserRouter)
app.use('/api/form', FormLevelRoutes)
app.use('/api/landing', LandingRoutes)

// PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Puerto asignado=  ${PORT}`)
})
