// import { use } from "passport"
import { UserService } from "../services/user.service";
import IUser from "../interfaces/user.interface";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export class UserController{
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    // this is a function that is responsible for finding a user by email
    async userFindByEmail(email: string): Promise<IUser | null>{
        const user = await this.userService.userFindByEmail(email);
        return user;
    }


    async userFindById(id: string): Promise<IUser | null>{
        const user = await this.userService.userFindById(id);
        return user;
    }

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

    userFollow = asyncHandler(async(req, res): Promise<void> => {
        const {id} = req.params;
        const followerId = req.user?._id;
        const user = await this.userService.userFollow(id, followerId);
        res.json(new ApiResponse(200, null, "User followed successfully"));
    })

    // userUnfollow = async (id: string, followId: string): Promise<IUser | null>{
    //     const user = await this.userService.userUnfollow(id, followId);
    //     return user;
    // }

    userFindAll = asyncHandler(async (req, res): Promise<void> => {
        const users = await this.userService.userFindAll();
        console.log("Users: ",users)
        res.json(new ApiResponse(200, users, "Users found successfully"));
    })
}