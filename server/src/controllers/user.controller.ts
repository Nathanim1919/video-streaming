// import { use } from "passport"
import {UserService} from "../services/user.service";
import IUser from "../interfaces/user.interface";
import {asyncHandler} from "../utils/asyncHandler";
import {ApiResponse} from "../utils/ApiResponse";
import {CacheClient} from "../config/redisClient";

import {Request} from "express";
import logger from "../logger";
import path from "path";

export interface RequestWithUser extends Request {
  user: IUser;
  file?: any;
}

/*
 * Controller responsible for user related operations.
 */
export class UserController {
  private userService: UserService;
  private cacheClient: CacheClient;

  // Inject user service or repository here for database interactions.
  constructor() {
    this.userService = new UserService();
    this.cacheClient = CacheClient.getInstance();
  }
  // get actions based on the user's role whether they are the owner of the profile or not
  getActions(isOwner: boolean): string[] {
    return isOwner
      ? ["create", "edit", "delete", "other"] // Actions for the owner
      : ["follow", "unfollow", "RSVP", "unRSVP"]; // Actions for others
  }

  // this is a function that is responsible for finding a user by email
  async userFindByEmail(email: string): Promise<IUser | null> {
      return await this.userService.userFindByEmail(email);
  }

  userFindById = asyncHandler(
    async (req: RequestWithUser, res): Promise<void> => {
      // Step 1: Get the user ID from the request parameters
      const { id } = req.params;

      let user;
      // Step 2: Check if the user data is in the cache
      const userExists = await this.cacheClient.exists(`user:${id}`);
      if (userExists) {
        // User data is in the cache, retrieve it
        const cachedUser = await this.cacheClient.get(`user:${id}`);
        user = JSON.parse(cachedUser);
      } else {
        // User data is not in the cache, fetch and cache it
        user = await this.userService.userFindById(id);
        await this.cacheClient.set(`user:${id}`, JSON.stringify(user));
      }

      // Step 3: Determine if the current user is the owner of the profile
      const isOwner = req.user._id.toString() === id.toString();

      // Step 4: Get the actions based on the user's role
      const actions = this.getActions(isOwner);

      // Step 5: Send the response with the user data and actions
      res.json(
        new ApiResponse(200, user, "User found successfully", actions, isOwner)
      );
    }
  );

  async userCreate(userData: Partial<IUser>): Promise<IUser | null> {
    const newUser = await this.userService.userCreate(userData);
    // save the user in the cache
    await this.cacheClient.set(`user:${newUser._id}`, JSON.stringify(newUser));
    logger.info("User created successfully and saved in cache");
    return newUser;
  }

  userUpdate = asyncHandler(
    async (req: RequestWithUser, res): Promise<void> => {
      const updatedUser = await this.userService.userUpdate(
        req.user._id as string,
        req.body
      );
      // update the user in the cache or set it if it doesn't exist
      await this.cacheClient.set(
        `user:${req.user._id}`,
        JSON.stringify(updatedUser)
      );
      res.json(new ApiResponse(200, updatedUser, "User updated successfully"));
    }
  );

  async userDelete(id: string): Promise<IUser | null> {
    const deletedUser = await this.userService.userDelete(id);
    // delete the user from the cache
    await this.cacheClient.delete(`user:${id}`);
    return deletedUser;
  }

  userFollow = asyncHandler(
    async (req: RequestWithUser, res): Promise<void> => {
      const { id } = req.params;
      const followerId = req.user._id;
      const user = await this.userService.userFollow(id, followerId);
      res.json(new ApiResponse(200, user, "User followed successfully"));
    }
  );

  userUnfollow = asyncHandler(
    async (req: RequestWithUser, res): Promise<void> => {
      const { id } = req.params;
      const followId = req.user._id;
      const user = await this.userService.userUnfollow(id, followId);
      res.json(new ApiResponse(200, user, "User unfollowed successfully"));
    }
  );

  uploadProfileImage = asyncHandler(async (req: RequestWithUser, res) => {
    console.log("The requested file path is: ", req.file.path);
    const absolutePath = path.resolve(req.file.path);
    const updatedUser = await this.userService.uploadProfilePicture(
      req.user._id as string,
      absolutePath
    );
    console.log("The updated user is: ", updatedUser);
    // update the user in the cache or set it if it doesn't exist
    await this.cacheClient.set(
      `user:${req.user._id}`,
      JSON.stringify(updatedUser)
    );
    res.json(
      new ApiResponse(200, updatedUser, "Profile picture uploaded successfully")
    );
  });

  getBookmarks = asyncHandler(
    async (req: RequestWithUser, res): Promise<void> => {
      logger.info("Getting bookmarks for user: ", req.user._id);
      const bookmarks = await this.userService.getBookmarks(req.user._id);
      res.json(new ApiResponse(200, bookmarks, "Bookmarks found successfully"));
    }
  );

  userFindAll = asyncHandler(
    async (req: RequestWithUser, res): Promise<void> => {
      // Get all from cache
      const cachedUsers = await this.cacheClient.exists("users");
      if (cachedUsers) {
        logger.info("Users found in cache");
        const users = await this.cacheClient.get("users");
        res.json(
          new ApiResponse(200, JSON.parse(users), "Users found successfully")
        );
        return;
      } else {
        const users = await this.userService.userFindAll(req, res);
        // Save all in cache
        await this.cacheClient.set("users", JSON.stringify(users));
        res.json(new ApiResponse(200, users, "Users found successfully"));
      }
    }
  );
}
