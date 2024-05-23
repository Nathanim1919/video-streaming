// auth.routes.ts
import express from 'express';
import { AuthController } from '../auth/auth.controller';


const router = express.Router();
const authController = new AuthController();

// Authentication routes
router.post('/register', [authController.register.bind(authController)]);
router.post('/login', [authController.login.bind(authController)]);
router.post('/logout', [authController.logout.bind(authController)]);

export default router;
