import IEvent from "../interfaces/event.interface";
import mongoose, { Schema, Document } from "mongoose";


const EventSchema = new Schema<IEvent>({
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
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    date: {
        type: String,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    rsvp: {
        type: String,
        default: false
    },
    status: {
        type: String,
        default: 'scheduled',
        enum: ['scheduled', 'live', 'completed', 'cancelled', 'postponed', 'full']
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
    },
    eventInformations: [
        {
          title: {
            type: String,
            default: ""
          },
          description: {
            type: String,
            default: ""
          }
        }
      ]
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);