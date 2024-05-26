// Event service class
import mongoose from 'mongoose';
import IEvent from '../interfaces/event.interface';
import IUser from '../interfaces/user.interface';
import EventModel from '../models/event.model';
import { User } from '../models/user.model';


export class EventService {
    // Create a new event
    async createEvent(eventData: IEvent, user: IUser): Promise<IEvent> {
        const newEvent = await EventModel.create(eventData);
        // Add the event to the user's events
        const person = await User.findById(user._id);
        if (!person) {
            throw new Error('User not found');
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
        const events = await EventModel.find().populate('owner').populate('attendees');
        console.log(events);
        return events;
    }

    // Get a single event
    async getEvent(eventId: string): Promise<IEvent> {
        const event = await EventModel.findById(eventId).populate('owner').populate('attendees');
        return event;
    }

    // RSVP to an event
    async rsvp(eventId: string, user: any): Promise<IEvent> {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.attendees.length >= event.capacity) {
            event.status = 'full';
            return event;
        }

        if (event.attendees.includes(user._id)) {
            throw new Error('You have already RSVP\'d to this event');
        }

        event.attendees.push(user._id);

        const person = await User.findById(user._id);
        if (!person) {
            throw new Error('User not found');
        }

        person.rvps.push(event._id);


        await person.save();
        await event.save();
        return event;
    }

    // Remove RSVP to an event
    async removeRsvp(eventId: string, user: any): Promise<IEvent> {
        const event = await EventModel.findById(eventId);
        const person = await User.findById(user._id);
        if (!person) {
            throw new Error('User not found');
        }
        if (!event) {
            throw new Error('Event not found');
        }

        if (!person.rvps.includes(event._id)) {
            throw new Error('You have not RSVP\'d to this event');
        }

        if (!event.attendees.includes(user._id)) {
            throw new Error('You have not RSVP\'d to this event');
        }

        event.attendees = event.attendees.filter((attendee) => attendee.toString() !== user._id.toString());
        person.rvps = person.rvps.filter((rsvp) => rsvp.toString() !== event._id.toString());

        await person.save();
        await event.save();
        return event;
    }

    // Get all events a user has RSVP'd to
    async getMyEvents(user: any): Promise<IEvent[]> {
        const events = await EventModel.find({ attendees: user._id }).populate('owner').populate('attendees');
        return events;
    }


    // Get all events a user has created
    async getMyCreatedEvents(user: any): Promise<IEvent[]> {
        const events = await EventModel.find({ owner: user._id }).populate('owner').populate('attendees');
        return events;
    }


    // Update an event
    async updateEvent(eventId: string, eventData: IEvent): Promise<IEvent> {
        const event = await EventModel.findByIdAndUpdate(eventId, eventData, { new: true });
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
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
                { eventType: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
            ],
        }).populate('owner').populate('attendees');
        return events;
    }


    // Filter events
    async filterEvents(filter: { [key: string]: any }): Promise<IEvent[]> {
        const events = await EventModel.find(filter).populate('owner').populate('attendees');
        return events;
    }


    // Get events by location
    async getEventsByLocation(location: string): Promise<IEvent[]> {
        const events = await EventModel.find({ location }).populate('owner').populate('attendees');
        return events;
    }


    // Get events by date
    async getEventsByDate(date: string): Promise<IEvent[]> {
        const events = await EventModel.find({ date }).populate('owner').populate('attendees');
        return events;
    }


    // Get events by eventType
    async getEventsByType(eventType: string): Promise<IEvent[]> {
        const events = await EventModel.find({ eventType }).populate('owner').populate('attendees');
        return events;
    }


    // Get events by price
    async getEventsByPrice(price: number): Promise<IEvent[]> {
        const events = await EventModel.find({ price }).populate('owner').populate('attendees');
        return events;
    }

    // Get events by status
    async getEventsByStatus(status: string): Promise<IEvent[]> {
        const events = await EventModel.find({ status }).populate('owner').populate('attendees');
        return events;
    }


    // Get events happening today
    async getEventsToday(): Promise<IEvent[]> {
        const today = new Date().toISOString().split('T')[0];
        const events = await EventModel.find({ date: today }).populate('owner').populate('attendees');
        return events;
    }


    // Get events happening this week
    async getEventsThisWeek(): Promise<IEvent[]> {
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        const events = await EventModel.find({
            date: {
                $gte: weekStart.toISOString().split('T')[0],
                $lte: weekEnd.toISOString().split('T')[0],
            },
        }).populate('owner').populate('attendees');
        return events;
    }


    // Get events happening this month
    async getEventsThisMonth(): Promise<IEvent[]> {
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const events = await EventModel.find({
            date: {
                $gte: monthStart.toISOString().split('T')[0],
                $lte: monthEnd.toISOString().split('T')[0],
            },
        }).populate('owner').populate('attendees');
        return events;
    }


    // Check if a user has RSVP'd to an event
    async checkRsvp(eventId: string, user: any): Promise<boolean> {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        return event.attendees.includes(user._id);
    }


    // Get events by tag
    async getEventsByTag(tag: string): Promise<IEvent[]> {
        const events = await EventModel.find({ tags: tag }).populate('owner').populate('attendees');
        return events;
    }


    // Get events by capacity
    async getEventsByCapacity(capacity: number): Promise<IEvent[]> {
        const events = await EventModel.find({ capacity }).populate('owner').populate('attendees');
        return events;
    }


    // Get events by price range
    async getEventsByPriceRange(minPrice: number, maxPrice: number): Promise<IEvent[]> {
        const events = await EventModel.find({ price: { $gte: minPrice, $lte: maxPrice } }).populate('owner').populate('attendees');
        return events;
    }


    // get 4 upcoming events
    async getUpcomingEvents(): Promise<IEvent[]> {
        const events = await EventModel.find({ date: { $gte: new Date().toISOString() } }).limit(4).populate('owner').populate('attendees');
        return events;
    }


    



}