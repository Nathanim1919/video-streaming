import { use } from "passport";
import IUser from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { Request, Response } from 'express';

interface RequestWithUser extends Request {
  user: IUser;
}

export class UserService {

    // this is a function that is responsible for finding all users
    async userFindAll(req: RequestWithUser, res:Response): Promise<IUser[] | null>{
        const currentUserId = req.user?._id
        // filter all users other than the logged in user
        const users = await User.find({_id: {$ne: currentUserId}});
        // console.log(users)
        return users;
    }

    // this is a function that is responsible for finding a user by email
    async userFindByEmail(email: string): Promise<IUser | null>{
        const user = await User.findOne({email});
        return user;
    }

    // this is a function that is responsible for finding a user by id
    async userFindById(id: string): Promise<IUser | null>{
        const user = await User.findById(id).populate('events');
        return user;
    }

    // this is a function that is responsible for creating a user
    async userCreate(userData: Partial<IUser>): Promise<IUser | null>{
        const newUser = await User.create(userData);
        return newUser;
    }

    // this is a function that is responsible for updating a user
    async userUpdate(id: string, userData: Partial<IUser>): Promise<IUser | null>{
        const updatedUser = await User.findByIdAndUpdate(id, userData, {new: true});
        return updatedUser;
    }

    // this is a function that is responsible for deleting a user
    async userDelete(id: string): Promise<IUser | null>{
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }

    // this is a function that is responsible for following a user
    async userFollow(id: string, followerId: string): Promise<IUser | null>{
        const user = await User.findById(id);
        const followerUser = await User.findById(followerId);

        if(user && followerUser){
            followerUser.following.push(user._id);
            user.followers.push(followerUser._id);

            await user.save();
            await followerUser.save();
        }

        return user;
    }

    // this is a function that is responsible for unfollowing a user
   // this is a function that is responsible for unfollowing a user
    async userUnfollow(id: string, followId: string): Promise<IUser | null>{
        const user = await User.findById(id);
        const followUser = await User.findById(followId);

        if(user && followUser){
            user.followers = user.followers.filter((id) => id.toString() !== followUser._id.toString());
            followUser.following = followUser.following.filter((id) => id.toString() !== user._id.toString());
        
            console.log("after unfollowing, users followers are: ", user.followers)
        
            await user.save();
            await followUser.save();
        }

        return user;
    }

    // this is a function that is responsible for updating a user's password
    async userUpdatePassword(id: string, password: string): Promise<IUser | null>{
        const user = await User.findById(id);
        if(user){
            user.password = password;
            await user.save();
        }
        return user;
    }

    // this is a function that is responsible for updating a user's rating
    async userUpdateRating(id: string, rating: number): Promise<IUser | null>{
        const user = await User.findById(id);
        if(user){
            user.rating = rating;
            await user.save();
        }
        return user;
    }

    // this is a function that is responsible for updating a user's refreshToken
    async userUpdateRefreshToken(id: string, refreshToken: string): Promise<IUser | null>{
        const user = await User.findById(id);
        if(user){
            user.refreshToken = refreshToken;
            await user.save();
        }
        return user;
    }

    // this is a function that is responsible for updating a user's social media
    async userUpdateSocialMedia(id: string, socialMedia: { [key: string]: string }): Promise<IUser | null>{
        const user = await User.findById(id);
        if(user){
            user.socialMedia = socialMedia;
            await user.save();
        }
        return user;
    }

    // this is a function that is responsible for updating a user's events
    async userUpdateEvents(id: string, eventId: string): Promise<IUser | null>{
        const user = await User.findById(id);
        if(user){
            user.events.push(eventId);
            await user.save();
        }
        return user;
    }
}