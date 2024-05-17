import crypto from "crypto";
import jwt from 'jsonwebtoken'
import UserModel from "../models/user.model.js";
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';




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
    console.log(req)
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


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find({});

    res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    )
});


const handleSocialLogin = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
        return res.status(404).json({message:"User not found"});
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: false,
    }

    return res.
        status(200).
        cookie("refreshToken", refreshToken, options).
        cookie("accessToken", accessToken, options)
        redirect(
            // redirect user to the frontend with access and refresh token in case user is not using cookies
            `${process.env.CLIENT_SSO_REDIRECT_URL}`
        );
});



const followUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { _id: followerId } = req.user;

    const user = await UserModel.findById(userId).select("+followers");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { followers: followerId } },
        { new: true }
    );
    const updatedUser = await UserModel.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: userId } },
        { new: true }
    );
    res.status(200).json({ user:updatedUser,message: "User followed successfully" });
});

const unfollowUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { _id: followerId } = req.user;

    const user = await UserModel.findById(userId).select("+followers");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { followers: followerId } },
        { new: true }
    );
    const updatedUser = await UserModel.findByIdAndUpdate(
        followerId,
        { $pull: { following: userId } },
        { new: true }
    );
    res.status(200).json({ message: "User unfollowed successfully" });
});

// const handleFollowUnfollowUser = asyncHandler(async (req, res) => {
//     const { userId } = req.params;

//     if (req.user._id === userId) {
//         return res.status(400).json({ message: "You cannot follow yourself" });
//     }

//     const user = await UserModel.findById(userId);
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     const isFollowing = user.followers.includes(req.user._id);

//     if (isFollowing) {
//         return unfollowUser(req, res);
//     }
//     return followUser(req, res);
// });


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getAllUsers,
    handleSocialLogin,
    unfollowUser,
    followUser
};