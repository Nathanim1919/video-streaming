import IUser from "../interfaces/user.interface";
import { User } from "../models/user.model";


export class UserService {

    // this is a function that is responsible for finding a user by email
    async userFindByEmail(email: string): Promise<IUser | null>{
        const user = await User.findOne({email});
        return user;
    }

    // this is a function that is responsible for finding a user by id
    async userFindById(id: string): Promise<IUser | null>{
        const user = await User.findById(id);
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
    async userFollow(id: string, followId: string): Promise<IUser | null>{
        const user = await User.findById(id);
        const followUser = await User.findById(followId);

        if(user && followUser){
            user.following.push(followUser._id);
            followUser.followers.push(user._id);

            await user.save();
            await followUser.save();
        }

        return user;
    }

    // this is a function that is responsible for unfollowing a user
    async userUnfollow(id: string, followId: string): Promise<IUser | null>{
        const user = await User.findById(id);
        const followUser = await User.findById(followId);

        if(user && followUser){
            user.following = user.following.filter((id) => id.toString() !== followId);
            followUser.followers = followUser.followers.filter((id) => id.toString() !== id);

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