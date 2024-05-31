import { AuthService } from './auth.service';
import IUser from '../interfaces/user.interface';
import { Request as ExpressRequest, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import logger from '../logger';

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
      const registrationMessage =  await this.authService.register(req.body as Partial<IUser>);
      console.log(registrationMessage)
      res.status(201).json({ message: registrationMessage });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Login user
  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, existingUser } = await this.authService.login(req.body as IUser);
    res.json(
      new ApiResponse(
        200,
        {
          user:existingUser,
          token,
        },
        "User logged in successfully"
      )
    );
  });

  // Logout user
  logout = asyncHandler(async (req: Request, res: Response): Promise<ApiResponse> => {
    try {
      const token = req.locals.token;
      logger.info(`Logging out user with token: ${token}`);
      logger.info(`Logging out user ${req.user}`)
      await this.authService.logout(token);
      return new ApiResponse(200, null, "User logged out successfully");
    } catch (error) {
      logger.error(error.message);
      res.status(401).json({ error: error.message });
    }
  });
}
