
import mongoose, { Schema } from "mongoose";


const EventSchema = new Schema({
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
    },
    eventInfo:[
        {
            title:"",
            description:""
        }
    ]
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);