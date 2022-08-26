import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { levelFormUSer, } from '../controllers/levelForm.js'


const router = express.Router()

//Creando formularios para definir niveles
router.post('/create-form', checkAuth, levelFormUSer)

export default router