// Define the structure of the User model
import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmark {
  type: 'Event' | 'Stream',
  item: mongoose.Types.ObjectId
}


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
    bookmarks: IBookmark[];
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
