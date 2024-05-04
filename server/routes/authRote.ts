import express from 'express'

const router = express.Router();
import { register, login, getStreamers } from '../controllers/authController';


router.post('/register', register)
router.post('/login', login)
router.get('/streamers', getStreamers)


export default router;