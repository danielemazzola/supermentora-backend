import express from 'express'
import { login, register } from '../controllers/usersController.js'

const router = express.Router()

// LOGIN Y REGISTRO DE USUARIOS
router.post('/login-user', login)
router.post('/new-user', register)

export default router
