// Event service class
import mongoose from "mongoose";
import IEvent from "../interfaces/event.interface";
import IUser from "../interfaces/user.interface";
import EventModel from "../models/event.model";
import { User } from "../models/user.model";
import logger from "../logger";
import QRCode from "qrcode";
import IRsvp from "../interfaces/rsvp.interface";
import RSVP from "../models/rsvp.model";
import { CacheClient } from "../config/redisClient";

export class EventService {
  // instance of the CacheClient class
  private cacheClient: CacheClient;

  constructor() {
    this.cacheClient = CacheClient.getInstance();
  }

  // Create a new event
  async createEvent(eventData: IEvent, user: IUser): Promise<IEvent> {
    const newEvent = await EventModel.create(eventData);
    // Add the event to the user's events
    const person = await User.findById(user._id);
    if (!person) {
      throw new Error("User not found");
    }

    person.events.push(newEvent._id);
    await person.save();

    // Add the user as the owner of the event
    // newEvent.owner = user._id;
    newEvent.owner = user._id as unknown as mongoose.Types.ObjectId;
    await newEvent.save();
    return newEvent;
  }

  // Get all events
  async getAllEvents(): Promise<IEvent[]> {
    const events = await EventModel.find()
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get a single event
  async getEvent(eventId: string): Promise<IEvent> {
    const event = await EventModel.findById(eventId)
      .populate("owner")
      .populate("attendees");
    return event;
  }

  // set event status to live
  async setEventStatus(eventId: string): Promise<IEvent> {
    // Check if the event exists, and then if the date is today and also it is 30 minutes to the event, set the status to live
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    const eventDate = new Date(event.date);
    const currentDate = new Date();
    const eventTime = eventDate.getTime();
    const currentTime = currentDate.getTime();
    const timeDifference = eventTime - currentTime;
    const thirtyMinutes = 30 * 60 * 1000;

    if (timeDifference <= thirtyMinutes) {
      event.status = "live";
      await event.save();
    } else if (timeDifference < 0) {
      event.status = "completed";
      await event.save();
    } else {
      event.status = "scheduled";
      await event.save();
    }

    return event;
  }

  // Get live events
  async getLiveEvents(): Promise<IEvent[]> {

    const events = await EventModel.find({ status: "live" })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // RSVP to an event
  async rsvp(eventId: string, user: any): Promise<IRsvp | IEvent> {
    // Check if the event exists
    const event = await EventModel.findById(eventId);

    if (event.attendees.includes(user._id)) {
      throw new Error("You have already RSVP'd to this event");
    }

    const rsvp = new RSVP({
      userId: user._id,
      eventId: event._id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await rsvp.save();

    const qrData = `https://eventify.nathanim.me/verify-rsvp/${rsvp._id}`; // Only encoding the RSVP ID

    const qrCodeImage = await QRCode.toDataURL(qrData);
    rsvp.qrCodeUrl = qrCodeImage;

    await rsvp.save();

    event.attendees.push(user._id);

    const person = await User.findById(user._id);
    if (!person) {
      throw new Error("User not found");
    }

    person.rvps.push(event._id);

    await person.save();
    await event.save();
    return rsvp;
  }

  // Remove RSVP to an event
  async removeRsvp(eventId: string, user: any): Promise<IEvent> {
    const event = await EventModel.findById(eventId);
    const person = await User.findById(user._id);
    if (!person) {
      throw new Error("User not found");
    }
    if (!event) {
      throw new Error("Event not found");
    }

    if (!person.rvps.includes(event._id)) {
      throw new Error("You have not RSVP'd to this event");
    }

    if (!event.attendees.includes(user._id)) {
      throw new Error("You have not RSVP'd to this event");
    }

    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== user._id.toString()
    );
    person.rvps = person.rvps.filter(
      (rsvp) => rsvp.toString() !== event._id.toString()
    );

    // delete the rsvp of the user from the rsvp collection
    await RSVP.deleteOne({ userId: user._id, eventId: event._id });

    await person.save();
    await event.save();
    return event;
  }

  // Get all events a user has RSVP'd to
  async getMyEvents(user: any): Promise<IRsvp[]> {
    const rsvps = await RSVP.find({ userId: user._id })
      .populate("eventId")
      .populate("userId");

    return rsvps;
  }

  // Get all events a user has created
  async getMyCreatedEvents(user: any): Promise<IEvent[]> {
    // Get from cache
    const myEventsCacheKey = `myEvents:${user._id}`;
    const myEventsCacheValue = await this.cacheClient.get(myEventsCacheKey);
    if (myEventsCacheValue) {
      logger.info("Getting my events from cache");
      return JSON.parse(myEventsCacheValue);
    }
    const events = await EventModel.find({ owner: user._id })
      .populate("owner")
      .populate("attendees");

    // Save in cache
    await this.cacheClient.set(myEventsCacheKey, JSON.stringify(events), 60);

    return events;
  }

  // Update an event
  async updateEvent(eventId: string, eventData: IEvent): Promise<IEvent> {
    const event = await EventModel.findByIdAndUpdate(eventId, eventData, {
      new: true,
    });
    return event;
  }

  // Delete an event
  async deleteEvent(eventId: string): Promise<IEvent> {
    const event = await EventModel.findByIdAndDelete(eventId);
    return event;
  }

  // Search events
  async searchEvents(query: string): Promise<IEvent[]> {
    const events = await EventModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { eventType: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Filter events
  async filterEvents(filter: { [key: string]: any }): Promise<IEvent[]> {
    const events = await EventModel.find(filter)
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events by location
  async getEventsByLocation(location: string): Promise<IEvent[]> {
    const events = await EventModel.find({ location })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events by date
  async getEventsByDate(date: string): Promise<IEvent[]> {
    const events = await EventModel.find({ date })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events by eventType
  async getEventsByType(eventType: string): Promise<IEvent[]> {
    const events = await EventModel.find({ eventType })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events by price
  async getEventsByPrice(price: number): Promise<IEvent[]> {
    const events = await EventModel.find({ price })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events by status
  async getEventsByStatus(status: string): Promise<IEvent[]> {
    const events = await EventModel.find({ status })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events happening today
  async getEventsToday(): Promise<IEvent[]> {
    const today = new Date().toISOString().split("T")[0];
    const events = await EventModel.find({ date: today })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events happening this week
  async getEventsThisWeek(): Promise<IEvent[]> {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    const events = await EventModel.find({
      date: {
        $gte: weekStart.toISOString().split("T")[0],
        $lte: weekEnd.toISOString().split("T")[0],
      },
    })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  async getTopEventsOfTheWeek(): Promise<IEvent[]> {
    logger.info("Getting top events of the week");
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    const events = await EventModel.find({
      date: {
        $gte: weekStart.toISOString().split("T")[0],
        $lte: weekEnd.toISOString().split("T")[0],
      },
    })
      .populate("owner")
      .populate("attendees")
      .sort({ attendees: -1 })
      .limit(3);

    return events;
  }

  // Get events happening this month
  async getEventsThisMonth(): Promise<IEvent[]> {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const events = await EventModel.find({
      date: {
        $gte: monthStart.toISOString().split("T")[0],
        $lte: monthEnd.toISOString().split("T")[0],
      },
    })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Check if a user has RSVP'd to an event
  async checkRsvp(eventId: string, user: any): Promise<boolean> {
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    return event.attendees.includes(user._id);
  }

  // Get events by tag
  async getEventsByTag(tag: string): Promise<IEvent[]> {
    const events = await EventModel.find({ tags: tag })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events by capacity
  async getEventsByCapacity(capacity: number): Promise<IEvent[]> {
    const events = await EventModel.find({ capacity })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  // Get events by price range
  async getEventsByPriceRange(
    minPrice: number,
    maxPrice: number
  ): Promise<IEvent[]> {
    const events = await EventModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .populate("owner")
      .populate("attendees");
    return events;
  }

  async getUpcomingEvents(user: any): Promise<IEvent[]> {
   
    const today = new Date();

    // Get the IDs of the users that the current user is following
    const followingUserIds = user.followers;

    const events = await EventModel.find({
      date: { $gte: today.toISOString().split("T")[0] },
      owner: { $in: followingUserIds },
      attendees: { $ne: user._id },
      status: { $ne: "full" },
    })
      .sort("date")
      .limit(4)
      .populate("owner")
      .populate("attendees");

    return events;
  }

  async verifyTicket(rsvpId: string): Promise<IRsvp> {
    try {
      const rsvp = await RSVP.findById(rsvpId);

      if (!rsvp) {
        return;
      }

      if (rsvp.isUsed) {
        return;
      }

      if (new Date() > new Date(rsvp.expiresAt)) {
        return;
      }

      // Mark the RSVP as used
      rsvp.isUsed = true;
      await rsvp.save();

      return rsvp;
    } catch (error) {
      return error;
    }
  }
}
