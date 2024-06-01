import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";


interface JwtPayload {
    userId: string
}


export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    // console.log("token is: ", token)

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized request"
        });
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const user = await User.findById(decodedToken.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                message: "Invalid access token"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid access token"
        });
    }
});
