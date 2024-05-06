import express from 'express'

const router = express.Router();
import { loginUser, registerUser, getAllUsers, getCurrentUser, logoutUser } from '../controllers/authController.js';


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/streamers', getAllUsers)
router.get('/me', getCurrentUser)
router.post('/logout', logoutUser)


export default router;