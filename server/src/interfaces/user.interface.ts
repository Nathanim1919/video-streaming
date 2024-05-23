// Define the structure of the User model
interface IUser {
    _id: string;
    email: string;
    password: string;
    profession: string;
    username: string;
    fullName: string;
    loginType: string;
    followers: string[];
    following: string[];
    events: string[];
    rvps: string[];
    rating: number;
    refreshToken?: string;
    socialMedia?: { [key: string]: string };
  }
  
  // Export the User interface
  export default IUser;
  