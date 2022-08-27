import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { createForm, deleteForm } from '../controllers/levelForm.js'


const router = express.Router()

//Creando formularios para definir niveles
router.post('/create-form', checkAuth, createForm)
router.delete('/delete-form/:id', checkAuth, deleteForm)

export default router