import { Event } from "./event";
export interface UserInterface {
    _id: string;
    avatar:string;
    fullName: string;
    username: string;
    profession: string;
    email:string;
    createdAt: string;
    updatedAt: string;
    rvps:string[];
    streams:Event[];
    followers:string[];
    following:string[];
    bio:string;
    location:string;
    events:Event[];
    rating: number;
    profilePicture: {
        public_id: string;
        url: string;
    };
}