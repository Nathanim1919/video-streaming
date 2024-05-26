// Define the structure of the Event model
import { Schema, SchemaTypeOpts } from 'mongoose';
interface IEvent {
    _id: string;
    owner: import('mongoose').Types.ObjectId; // Reference to the User who owns the event
    title: string;
    description: string;
    location: string; // it might be a physical location or an online link
    image?: string;
    date: string;
    attendees: string[]; // References to Users who are attending the event
    rsvp: SchemaTypeOpts<any>; // indicates if the event is open for RSVP
    status: 'scheduled' | 'live' | 'completed' | 'cancelled'| 'postponed' | 'full';
    eventType: 'meetup' | 'webinar' | 'seminar' | 'workshop' | 'conference' | 'hackathon' | 'party' | 'other';
    capacity: number;
    price: number;
    isOnline: boolean; // indicates if the event is online
    tags: string[];
    eventInformations: { title: string; description: string }[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Export the Event interface
  export default IEvent;
  