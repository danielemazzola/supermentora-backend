import express from 'express'
import {register} from '../../controllers/LandingController.js'


const router = express.Router()

//Landing Pages
router.post('/new-user', register)


export default router