import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const jwtAuthGuard = (req: Request, res: Response, next: NextFunction) => {
  // Extract the JWT token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Attach the user ID to the request object for further processing
    req.userId = decodedToken.userId;

    // Call the next middleware function
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};
