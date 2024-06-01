import mongoose, { Document, Schema } from "mongoose";

// Define the structure of the RSVP model

interface IRsvp extends Document{
    userId: Schema.Types.ObjectId;
    eventId: Schema.Types.ObjectId;
    qrCodeUrl: string;
    isUsed: boolean;
    expiresAt: Date;
    rsvpId: string;
}

// Export the RSVP interface
export default IRsvp;
