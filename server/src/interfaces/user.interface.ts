// Define the structure of the User model
import { Document } from 'mongoose';
interface IUser extends Document{
    _id: string;
    bio: string;
    email: string;
    password: string;
    profession: string;
    username: string;
    fullName: string;
    loginType: string;
    followers: string[];
    following: string[];
    events: string[];
    streams: string[];
    rvps: string[];
    rating: number;
    refreshToken?: string;
    socialMedia?: { [key: string]: string };
    profilePicture?: {
      public_id: string;
      url: string;
    }
  }
  
  // Export the User interface
  export default IUser;
