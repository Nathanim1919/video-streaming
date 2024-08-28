import { AuthService } from "./auth.service";
import IUser from "../interfaces/user.interface";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";

// interface Request extends ExpressRequest {
//   locals: {
//     token: string;
//   };
// }

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  generateTokens = (userId: string) => {
    const token = jwt.sign({ userId:userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRY,
    });
    const refreshToken = jwt.sign({ userId:userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    return { token, refreshToken };
  };

  // get user info if already authenticated
  getUserInfo = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.cookies.token;

        if (!token) {
          res.json(new ApiResponse(401, null, "Unauthorized access"));
        } else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: string;
          };
          const user = await this.userService.userFindById(decoded.userId);

          if (!user) {
            res.json(new ApiResponse(401, null, "User not found"));
          } else {
            res.json(new ApiResponse(200, user, "User found"));
          }
        }
      } catch (error) {
        console.error(error);
        res.json(new ApiResponse(500, null, "Internal server error"));
      }
    }
  );

  // Register a new user
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const registrationMessage = await this.authService.register(
        req.body as Partial<IUser>
      );

      res.status(201).json({ message: registrationMessage });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Login user
  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const existingUser = await this.authService.login(req.body as IUser);

    if (existingUser) {
      const { _id } = existingUser;
      const { token, refreshToken } = this.generateTokens(_id);

      res.cookie("token", token, {
        domain: ".nathanimt.me",
        secure: true,
        maxAge: 30 * 60 * 1000, // 30 minutes
        sameSite: "none",
      });

      res.cookie("refreshToken", refreshToken, {
        domain: ".nathanimt.me",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: "none",
      });

      res.json(new ApiResponse(200, existingUser, "Login successfully"));
    } else {
      res.status(403).redirect("/login?error=Invalid login credentials.");
    }
  });

  // Logout user
  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("username");
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.json(new ApiResponse(200, null, "logout successfully"));
  });

  refreshToken = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      try {
        const newAccessToken = await this.authService.refreshAccessToken(
          req.cookies?.refreshToken
        );
        res.clearCookie("token")
        res.cookie("token", newAccessToken, {
          domain: ".nathanimt.me",
          secure: true,
          maxAge: 15 * 60 * 1000, // 15 minutes
          sameSite: "none",
        });
        // res.status(200).send("Access token refreshed", newAccessToken);
        res.json(new ApiResponse(200, newAccessToken, "Access token refreshed"));
      } catch (error) {
        if (
          error.message === "Unauthorized request" ||
          error.message === "Invalid Refresh token"
        ) {
          res.status(401).send(error.message);
        } else {
          res
            .status(500)
            .send("An error occurred while refreshing the access token");
        }
      }
    }
  );
}
