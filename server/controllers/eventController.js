import EventModel from "../models/EventModel.js";
import UserModel from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createEvent = asyncHandler(async (req, res) => {
    const event = await EventModel.create(req.body);
    const user = await UserModel.findById(req.user._id);

    console.log(user, event)

    user.events.push(event._id);
    await user.save();

    event.owner = req.user.id;
    await event.save();

    res.status(201).json({
        success: true,
        data: event,
        message: "Event created successfully"
    })
})


export const getAllEvents = asyncHandler(async (req, res) => {
    const events = await EventModel.find().populate("owner");

    res.status(200).json({
        success: true,
        data: events
    })
});