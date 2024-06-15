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
    streams:string[];
    followers:string[];
    following:string[];
    bio:string;
    location:string;
    events:string[];
    rating: number;
}