import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { hashPassword } from "../utils/passHashing";


// register a new user
export const register = async (req: Request, res: Response) => {
    try{
        // check if all fields are filled
        if (!req.body.email || !req.body.password || !req.body.profession) 
            return res.status(400).json({ message: "Please fill all fields" });

        // check if user already exists
        const userExists = await UserModel.findOne({ email: req.body.email });
        if(userExists) return res.status(400).json({ message: "User already exists" });

        // hash password
        req.body.password = await hashPassword(req.body.password);

        // create new user
        const user = new UserModel(req.body);
        await user.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}