import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/asyncHandler";
import { NextFunction } from "express";
import mongoose from 'mongoose';
import { Request } from 'express';

interface CustomRequest extends Request {
    locals?: string;
}


export const verifyJWT = asyncHandler(async (req:CustomRequest, res, next: NextFunction) => {
    const token =
        req.cookies?.token ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        res.status(401).json({
            message:"Unauthorized request"
        })
    }

    try{
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
        const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        const user = await User.findById(decodedToken._id).select('-password');
        

        if (!user){
            res.status(401).json({
                message:"Invalid access token"
            })
        }
        req.user = user;
        req.locals = token;
        next();
    } catch(error) {
        res.status(401).json({
            message:"Invalid access token"
        })
    }
})


// /**
//  *
//  * @description Middleware to check logged in users for unprotected routes. The function will set the logged in user to the request object and, if no user is logged in, it will silently fail.
//  *
//  * `NOTE: THIS MIDDLEWARE IS ONLY TO BE USED FOR UNPROTECTED ROUTES IN WHICH THE LOGGED IN USER'S INFORMATION IS NEEDED`
//  */
// export const getLoggedInUserOrIgnore = asyncHandler(async (req, res, next) => {
//   const token =
//     req.cookies?.accessToken ||
//     req.header("Authorization")?.replace("Bearer ", "");

//   try {
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const user = await User.findById(decodedToken?._id)
//     req.user = user;
//     next();
//   } catch (error) {
//     // Fail silently with req.user being falsy
//     next();
//   }
// });


// Middleware to validate ObjectId
// export function validateObjectId(req: Request, res: Response, next: NextFunction) {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).send({ error: 'Invalid ID format' });
//     }
//     next();
//   }