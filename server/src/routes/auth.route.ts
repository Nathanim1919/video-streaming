// auth.routes.ts
import express from 'express';
import { AuthController } from '../auth/auth.controller';
import { verifyJWT } from '../auth/guards/jwt-auth.guard';


const router = express.Router();
const authController = new AuthController();

// Authentication routes
router.get('/me', [authController.getUserInfo.bind(authController)])
router.post('/register', [authController.register.bind(authController)]);
router.post('/login', [authController.login.bind(authController)]);
router.post('/logout',verifyJWT, [authController.logout.bind(authController)]);
router.post('/refresh-token', [authController.refreshToken.bind(authController)])

export default router;
