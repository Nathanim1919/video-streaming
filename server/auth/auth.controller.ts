import { AuthService } from './auth.service';
import IUser from '../interfaces/user.interface';
import { Request as ExpressRequest, Response } from 'express';

interface Request extends ExpressRequest {
  locals: {
    token: string;
  };
}

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Register a new user
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const registrationMessage = await this.authService.register(req.body as Partial<IUser>);
      res.status(201).json({ message: registrationMessage });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Login user
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = await this.authService.login(req.body as IUser);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };

  // Logout user
  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.locals.token;
      await this.authService.logout(token);
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
}
