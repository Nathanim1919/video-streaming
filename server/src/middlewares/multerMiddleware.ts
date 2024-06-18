// import express from 'express';
// import multer from 'multer';
// import { RequestWithUser } from '../controllers/user.controller';
// import { ApiResponse } from '../utils/ApiResponse';
// import { asyncHandler } from '../utils/asyncHandler';
// import { UserController } from '../controllers/user.controller';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Configure multer, possibly with more specific options

// router.post('/uploadProfileImage', upload.single('profileImage'), asyncHandler(async (req: RequestWithUser, res) => {
//     if (!req.file) {
//         return res.status(400).json(new ApiResponse(400, null, "No file uploaded"));
//     }
//     const updatedUser = await UserController.userService.uploadProfilePicture(
//       req.user._id as string,
//       req.file.filename
//     );
//     await UserController.cacheClient.set(`user:${req.user._id}`, JSON.stringify(updatedUser));
//     res.json(new ApiResponse(200, updatedUser, "Profile picture uploaded successfully"));
// }));