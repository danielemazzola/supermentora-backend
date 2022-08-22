import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { login, register, confirmCount, recoverPassword, recoverPasswordToken, newPassword, perfil } from '../controllers/usersController.js'

const router = express.Router()

// LOGIN Y REGISTRO DE USUARIOS
router.post('/login-user', login)
router.post('/new-user', register)
router.get('/confirm/:token', confirmCount)
router.post('/forgot-password', recoverPassword)
router.route('/forgot-password/:token').get(recoverPasswordToken).post(newPassword)
router.get('/perfil', checkAuth, perfil)

export default router
