import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { hashPassword } from "../utils/passHashing";


// register a new user
export const register = async (req: Request, res: Response) => {
    try{
        const {email, password,profession} = req.body;
        console.log(email, password)
        // check if all fields are filled
        if (!email || !password || !profession) 
            return res.status(400).json({ message: "Please fill all fields" });

        // check if user already exists
        const userExists = await UserModel.findOne({ email});
        if(userExists) return res.status(400).json({ message: "User already exists" });

        // hash password
        req.body.password = await hashPassword(password);

        // create new user
        const user = new UserModel(req.body);
        console.log(user)
        await user.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        const message = (error as Error).message;
        return res.status(500).json({ message });
    }
}


// login a user
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // check if all fields are filled
        if (!email || !password) 
            return res.status(400).json({ message: "Please fill all fields" });

        // check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });


        // compare password
        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) return res.status(400).json({ message: "Invalid credentials" });

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        const message = (error as Error).message;
        return res.status(500).json({ message });
    }
}


// get all streamers
export const getStreamers = async (req: Request, res: Response) => {
    console.log('get streamers')
    try {
        const streamers = await UserModel.find();
        return res.status(200).json(streamers);
    } catch (error) {
        const message = (error as Error).message;
        return res.status(500).json({ message });
    }
}