import { Mongoose, Schema } from "mongoose";

const OrgSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    rating: {
        type: Number,
        default: 0
    },
    socialMedia: {
        type: Map,
        of: String
    },
}, { timestamps: true
});

