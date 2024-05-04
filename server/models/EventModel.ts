import { ObjectId } from "mongoose";
import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document  {
    _id: string;
    owner: ObjectId;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    scheduleDate: string;
    attendees: ObjectId[];
    rsvp: boolean;
    status: string;
    eventType: string;
    capacity: number;
    price: number;
    isOnline: boolean;
    tags: string[];
}


const EventSchema: Schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    scheduleDate: {
        type: String,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    rsvp: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'scheduled',
        enum: ['scheduled', 'live', 'completed', 'cancelled']
    },
    eventType: {
        type: String,
        default: 'meetup',
        enum: ['meetup', 'webinar', 'seminar', 'workshop', 'conference', 'hackathon','party','other']
    },
    capacity: {
        type: Number,
        default: 100
    },
    price: {
        type: Number,
        default: 0
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);