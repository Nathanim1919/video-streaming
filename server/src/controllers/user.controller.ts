// import { use } from "passport"
import { UserService } from "../services/user.service";
import IUser from "../interfaces/user.interface";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

import { Request } from 'express';

interface RequestWithUser extends Request {
  user: IUser;
}


/*
* Controller responsible for user related operations.
*/
export class UserController{
    private userService: UserService;
    
    // Inject user service or repository here for database interactions.
    constructor(){
        this.userService = new UserService();
    }

    // this is a function that is responsible for finding a user by email
    async userFindByEmail(email: string): Promise<IUser | null>{
        const user = await this.userService.userFindByEmail(email);
        return user;
    }


    userFindById = asyncHandler(async(req: RequestWithUser, res):Promise<void> =>{
        const { id } = req.params;
        const isOwnProfile = id === req.user._id;
      
        const user = await this.userService.userFindById(id);
      
        const actions = isOwnProfile
          ? ['create', 'edit', 'delete', 'other'] // Actions for the owner
          : ['follow', 'unfollow', 'RSVP', 'unRSVP']; // Actions for others
      
        res.json(new ApiResponse(200, user, "User found successfully", actions));
    })

    async userCreate(userData: Partial<IUser>): Promise<IUser | null>{
        const newUser = await this.userService.userCreate(userData);
        return newUser;
    }

    async userUpdate(id: string, userData: Partial<IUser>): Promise<IUser | null>{
        const updatedUser = await this.userService.userUpdate(id, userData);
        return updatedUser;
    }

    async userDelete(id: string): Promise<IUser | null>{
        const deletedUser = await this.userService.userDelete(id);
        return deletedUser;
    }

    userFollow = asyncHandler(async(req: RequestWithUser, res): Promise<void> => {
        const {id} = req.params;
        const followerId = req.user._id;
        const user = await this.userService.userFollow(id, followerId);
        res.json(new ApiResponse(200, user, "User followed successfully"));
    })

    userUnfollow = asyncHandler(async(req: RequestWithUser, res): Promise<void> =>{
        const {id} = req.params;
        const followId = req.user._id;
        const user = await this.userService.userUnfollow(id, followId);
        res.json(new ApiResponse(200, user, "User unfollowed successfully"));
    })

    userFindAll = asyncHandler(async (req: RequestWithUser, res): Promise<void> => {
        const users = await this.userService.userFindAll(req, res);
        console.log("Users: ",users)
        res.json(new ApiResponse(200, users, "Users found successfully"));
    })
}