import EventModel from "../models/event.model.js";
import UserModel from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createEvent = asyncHandler(async (req, res) => {
    const event = await EventModel.create(req.body);
    const user = await UserModel.findById(req.user._id);

    console.log(user, event)

    user.events.push(event._id);
    await user.save();

    event.owner = req.user.id;
    await event.save();

    console.log(user, event)

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


export const handleRSVP = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const { _id: userId } = req.user;
  
    // Use a MongoDB query to check if the user has already RSVP'd
    const event = await EventModel.findOne({
      _id: eventId,
      attendees: { $ne: userId }
    });
  
    if (!event) {
      return res.status(404).json({
        message: "Event not found or user already RSVP'd"
      });
    }
  
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
  
    event.attendees.push(userId);
    user.rvps.push(eventId);
    await event.save();
    await user.save();
  
    res.status(200).json({
      success: true,
      data: event,
      message: "RSVP'd successfully"
    });
  });


export const removeRsvp = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const { _id: userId } = req.user;
  
    const event = await EventModel.findOne({
      _id: eventId,
      attendees: userId
    });
  
    if (!event) {
      return res.status(404).json({
        message: "Event not found or user already RSVP'd"
      });
    }
  
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
  
    const index = event.attendees.indexOf(userId);
    if (index > -1) {
      event.attendees.splice(index, 1);
    }
  
    const indexRsvp = user.rvps.indexOf(eventId);
    if (indexRsvp > -1) {
      user.rvps.splice(indexRsvp, 1);
    }
  
    await event.save();
    await user.save();
  
    res.status(200).json({
      success: true,
      data: event,
      message: "Rsvp removed successfully"
    });
  });



export const isRsvped = asyncHandler(async (req, res) => {
    const { eventId } = req.body;
    const { _id: userId } = req.user;
  
    const event = await EventModel.findOne({
      _id: eventId,
      attendees: userId
    });
  
    if (!event) {
      return res.status(404).json({
        message: "Event not found or user already RSVP'd"
      });
    }
  
    res.status(200).json({
      success: true,
      data: event
    });
})



export const getEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await EventModel.findById(eventId).populate("owner");

    res.status(200).json({
        success: true,
        data: event
    })
});