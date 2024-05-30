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
    // get actions based on the user's role whether they are the owner of the profile or not
    getActions(isOwner: boolean): string[] {
        return isOwner 
          ? ['create', 'edit', 'delete', 'other'] // Actions for the owner
          : ['follow', 'unfollow', 'RSVP', 'unRSVP']; // Actions for others
      }

    // this is a function that is responsible for finding a user by email
    async userFindByEmail(email: string): Promise<IUser | null>{
        const user = await this.userService.userFindByEmail(email);
        return user;
    }


    userFindById = asyncHandler(async(req: RequestWithUser, res):Promise<void> =>{
        // get the id from the request parameters
        const { id } = req.params;

        // find the user by id
        const user = await this.userService.userFindById(id);

        // check if the user is the owner of the profile
        // i think we have to compare the string id with the user id
        const isOwner = (req.user._id).toString() === (id).toString();
        console.log(isOwner);

        // get the actions based on the user's role
        const actions = this.getActions(isOwner);
      
        // send the response
        res.json(new ApiResponse(200, user, "User found successfully", actions, isOwner));
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
        res.json(new ApiResponse(200, users, "Users found successfully"));
    })
}