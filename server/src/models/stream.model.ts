import IEvent from "../interfaces/event.interface";
import mongoose, { Schema, Document } from "mongoose";
import StreamOrEventSchema from "./streamOrEvent.model";


const StreamSchema = new Schema<IEvent>({
    
    isOnline: {
        type: Boolean,
        default: false
    },
});


// extend the StreamOrEventSchema
StreamSchema.add(StreamOrEventSchema);

// Export the model and return the IEvent interface
export default mongoose.model('Stream', StreamSchema);


// Path: server/src/models/user.model.ts