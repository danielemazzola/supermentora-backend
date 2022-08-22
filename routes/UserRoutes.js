import express from 'express'
import { login, register, confirmCount } from '../controllers/usersController.js'

const router = express.Router()

// LOGIN Y REGISTRO DE USUARIOS
router.post('/login-user', login)
router.post('/new-user', register)
router.get('/confirm/:token', confirmCount)

export default router
