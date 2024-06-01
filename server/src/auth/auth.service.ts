// auth.service.ts

import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import IUser from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import logger from "../logger";

// Define a secret key for JWT token generation
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// interface token {
//   value: string
// }

/**
 * Service responsible for user authentication and authorization.
 */
export class AuthService {
  /**
   * Inject user service or repository here for database interactions.
   */
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserById(userId: string): Promise<IUser> {
    return await this.userService.userFindById(userId);
  }

  /**
   * Register a new user.
   * @param userData - The user data to register.
   * @returns A promise that resolves to a success message or user ID.
   * @throws If registration fails.
   */
  async register(userData: Partial<IUser>): Promise<string> {
    console.log("user data is: ", userData);
    try {
      // Example: Check if user already exists in the database
      const existingUser = await this.userService.userFindByEmail(
        userData.email as string
      );

      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(userData.password as string, 10);

      // Example: Create a new user in the database
      const newUser = await this.userService.userCreate({
        ...userData,
        password: hashedPassword,
      });

      // Return a success message or user ID
      return `User registered successfully: ${newUser?._id}`;
    } catch (error) {
      // Handle registration errors
      throw new Error(`Registration failed: ${error.message}`);
      console.log("error is: ", error);
    }
  }

  /**
   * Login user and generate JWT token.
   * @param user - The user to login.
   * @returns A promise that resolves to a JWT token.
   * @throws If login fails.
   */
  async login(
    user: IUser
  ): Promise<IUser> {
    try {
      // Verify user credentials (Example: fetch user from the database)
      const existingUser = await this.userService.userFindByEmail(user.email);
      if (!existingUser) {
        throw new Error("Invalid email or password");
      }

      // Compare passwords (Example: use bcrypt)
      const isPasswordValid = await bcrypt.compare(
        user.password,
        existingUser.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      return existingUser;
    } catch (error) {
      // Handle login errors
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  /**
   * Validate user based on JWT payload.
   * @param req - The request object.
   * @returns A promise that resolves to the user ID extracted from the JWT token, or null if validation fails.
   */
  static async validateUser(req: Request): Promise<string | null> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Authorization token missing");
      }

      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
      if (!decodedToken.userId) {
        throw new Error("Invalid JWT token");
      }

      // Here you can perform additional validation, such as checking if the user exists in the database
      return decodedToken.userId;
    } catch (error) {
      console.error("Error validating user:", error.message);
      return null;
    }
  }

  /**
   * Extract user ID from JWT token in the request.
   * @param req - The request object.
   * @returns The user ID extracted from the JWT token.
   * @throws If the token is missing or fails to decode.
   */
  extractUserIdFromToken(req: Request): string {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authorization token missing");
    }

    // Verify and decode the token to extract user ID
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decodedToken.userId;
    } catch (error) {
      throw new Error(`Failed to extract user ID from token: ${error.message}`);
    }
  }

  /**
   * Logout user by invalidating the JWT token.
   * @param token - The JWT token to invalidate.
   * @returns A promise that resolves when the token is invalidated.
   * @throws If logout fails.
   */
  async logout(token: string): Promise<void> {
    // Example: Blacklist the token or perform additional cleanup
    logger.info(`User logged out: ${token}`);
    return;
  }

  /**
   * Refreshes the access token using the provided refresh token.
   * @param refreshToken - The refresh token used to generate a new access token.
   * @returns A promise that resolves to the new access token or an error message.
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    if (!refreshToken) {
      throw new Error("Unauthorized request");
    }
    try {
      const decodeToken = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      ) as jwt.JwtPayload;
      const user = await this.userService.userFindById(decodeToken.userId);
      if (!user) {
        throw new Error("Invalid Refresh token");
      }
      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_SECRET_EXPIRY }
      );
      return newAccessToken;
    } catch (error) {
      throw error;
    }
  }
}
