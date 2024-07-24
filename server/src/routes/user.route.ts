import express from "express";
import { UserController } from "../controllers/user.controller";
import { verifyJWT } from "../auth/guards/jwt-auth.guard";
import multer from "multer";
const router = express.Router();
const userController = new UserController();
const upload = multer({ dest: "uploads/" });

// User routes
router.get("/", verifyJWT, [userController.userFindAll.bind(userController)]);
router.post("/upload", verifyJWT, upload.single("profileImage"), [
  userController.uploadProfileImage.bind(userController),
]);
router.get('/bookmarks',verifyJWT, [userController.getBookmarks.bind(userController)]);
router.get("/:id", verifyJWT, [
  userController.userFindById.bind(userController),
]);
router.patch("/:id", verifyJWT, [
  userController.userUpdate.bind(userController),
]);
router.post("/:id/follow", verifyJWT, [
  userController.userFollow.bind(userController),
]);
router.post("/:id/unfollow", verifyJWT, [
  userController.userUnfollow.bind(userController),
]);

export default router;

