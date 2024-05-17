// auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import User from '../interfaces/user.interface';

// Define a secret key for JWT token generation
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  // Example: Inject user service or repository here for database interactions

  // Register a new user
  async register(userData: Partial<User>): Promise<string> {
    try {
      // Example: Check if user already exists in the database
      // const existingUser = await this.userService.findByEmail(userData.email);
      // if (existingUser) {
      //   throw new Error('User already exists');
      // }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Example: Create a new user in the database
      // const newUser = await this.userService.create({
      //   ...userData,
      //   password: hashedPassword,
      // });

      // Return a success message or user ID
      return 'User registered successfully';
    } catch (error) {
      // Handle registration errors
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  // Login user and generate JWT token
  async login(user: User): Promise<string> {
    try {
      // Verify user credentials (Example: fetch user from the database)
      // const existingUser = await this.userService.findByEmail(user.email);
      // if (!existingUser) {
      //   throw new Error('Invalid email or password');
      // }

      // Compare passwords (Example: use bcrypt)
      // const isPasswordValid = await bcrypt.compare(user.password, existingUser.password);
      // if (!isPasswordValid) {
      //   throw new Error('Invalid email or password');
      // }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

      // Return the JWT token
      return token;
    } catch (error) {
      // Handle login errors
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  // Example: Implement additional authentication methods such as OAuth, Google Sign-In, etc.
   // Validate user based on JWT payload
   static async validateUser(req: Request): Promise<string | null> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('Authorization token missing');
      }

      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
      if (!decodedToken.userId) {
        throw new Error('Invalid JWT token');
      }

      // Here you can perform additional validation, such as checking if the user exists in the database
      // For simplicity, this example just returns the user ID extracted from the token
      return decodedToken.userId;
    } catch (error) {
      console.error('Error validating user:', error.message);
      return null;
    }
  }

  // Extract user ID from JWT token in the request
  extractUserIdFromToken(req: Request): string {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization token missing');
    }

    // Verify and decode the token to extract user ID
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decodedToken.userId;
    } catch (error) {
      throw new Error(`Failed to extract user ID from token: ${error.message}`);
    }
  }
}
