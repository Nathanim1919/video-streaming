import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import {asyncHandler} from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        res.status(401).json({
            message:"Unauthorized request"
        })
    }


    try{
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await UserModel.findById(decodedToken?._id);
        

        if (!user){
            res.status(401).json({
                message:"Invalid access token"
            })
        }
        req.user = user;
        next();
    } catch(error) {
        res.status(401).json({
            message:"Invalid access token"
        })
    }
})


/**
 *
 * @description Middleware to check logged in users for unprotected routes. The function will set the logged in user to the request object and, if no user is logged in, it will silently fail.
 *
 * `NOTE: THIS MIDDLEWARE IS ONLY TO BE USED FOR UNPROTECTED ROUTES IN WHICH THE LOGGED IN USER'S INFORMATION IS NEEDED`
 */
export const getLoggedInUserOrIgnore = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findById(decodedToken?._id)
    req.user = user;
    next();
  } catch (error) {
    // Fail silently with req.user being falsy
    next();
  }
});