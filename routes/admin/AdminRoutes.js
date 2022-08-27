import express from 'express'
import adminCheckAuth from '../../middleware/adminCheckAuth.js'
import { login, register, confirmCount, recoverPassword, recoverPasswordToken, newPassword, perfil } from '../../controllers/admin/adminController.js'

const router = express.Router()

// LOGIN Y REGISTRO DE USUARIOS
router.post('/login-user', login)
router.post('/new-user', register)
router.get('/confirm/:token', confirmCount)
router.post('/forgot-password', recoverPassword)
router.route('/forgot-password/:token').get(recoverPasswordToken).post(newPassword)
router.get('/perfil', adminCheckAuth, perfil)

export default router
