// auth.controller.ts

import { Request, Response } from 'express';
import { AuthService } from './/auth.service';
// import User  from '../models/user.model';
import User from '../interfaces/user.interface';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Register a new user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const registrationMessage = await this.authService.register(req.body as Partial<User>);
      res.status(201).json({ message: registrationMessage });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login user
  async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.login(req.body as User);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  // Example: Implement additional authentication endpoints as needed
}
