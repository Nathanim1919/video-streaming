import EventModel from "../models/EventModel";
import UserModel from "../models/UserModel";
import { asyncHandler } from "../utils/asyncHandler";



export const createEvent = asyncHandler(async (req, res) => {
    const event = await EventModel.create(req.body);

    res.status(201).json({
        success: true,
        data: event,
        message: "Event created successfully"
    })
})