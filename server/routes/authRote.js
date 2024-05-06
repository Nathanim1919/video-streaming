import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();
import { loginUser, registerUser, getAllUsers, getCurrentUser, logoutUser } from '../controllers/authController.js';


router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/streamers',verifyJWT, getAllUsers)
router.get('/me',verifyJWT, getCurrentUser)
router.post('/logout',verifyJWT, logoutUser)


export default router;