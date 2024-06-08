import IEvent from "../interfaces/event.interface";
import mongoose, { Schema, Document } from "mongoose";


const EventSchema = new Schema<IEvent>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
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
    isOpenForRsvp: {
        type: String,
        default: 'off',
        enum: ['on', 'off']
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
    duration: {
        type: Number,
        default: 1,
    },
    guests: [{
        name: {
            type: String,
            required: false
        },
        profession: {
            type: String,
            required: false
        },
        imageUrl: {
            type: String,
            required: false
        }
    }],

    specialInstructions: {
        type: String,
        default: ''
    },

    schedule: [{
        time: {
            type: String,
            required: false
        },
        activity: {
            type: String,
            required: false
        }
    }],

    socialLinks: [{
        platform: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    }],
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);


// Path: server/src/models/user.model.ts