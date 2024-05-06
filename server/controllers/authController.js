import crypto from "crypto";
import jwt from 'jsonwebtoken'
import UserModel from "../models/UserModel";
import {ApiResponse} from '../utils/ApiResponse';
import {asyncHandler} from '../utils/asyncHandler';




const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await UserModel.findById(userId);

        const accessToken = user?.generateAccessToken();
        const refreshToken = user?.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { email, password, profession, fullName } = req.body;

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        return res.status(409).json({message:"User already exists"});
    }

    const user = await UserModel.create({
        email,
        password,
        profession,
        fullName,
    });

    await user.save({ validateBeforeSave: false });


    const createdUser = await UserModel.findOne(user._id);

    if (!createdUser) {
        return res.status(500).json({message:"Something went wrong while registering the user"});
    }


    return res.
        status(201).
        json(
            new ApiResponse(
                200,
                {
                    user: createdUser
                },
                "User registered successfully"
            )
        )
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message:"Please provide an email and password"});
    }

    const user = await UserModel.findOne({ email});

    if (!user) {
        return res.status(404).json({message:"User does not exist"});
    }


    // Check if the password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({message:"Invalid credentials"});
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);


    const loggedInUser = await UserModel.findById(user._id);

    const options = {
        httpOnly: true,
    }


    return res.
        status(200).
        cookie("refreshToken", refreshToken, options).
        cookie("accessToken", accessToken, options).
        json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        )
});


const logoutUser = asyncHandler(async (req, res) => {
    await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined,
            },
        },
        { new: true }
    );

    const option = {
        httpOnly: true
    }


    return res.
        status(200).
        clearCookie("refreshToken", option).
        clearCookie("accessToken", option).
        json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )
});


const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        )
    )
});



export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};