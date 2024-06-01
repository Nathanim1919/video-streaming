// Purpose: Model for RSVPs to events.
import mongoose, {Schema} from "mongoose";
import IRsvp from "../interfaces/rsvp.interface";

const RSVPSchema = new Schema<IRsvp>({
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    eventId:{type:mongoose.Schema.Types.ObjectId, ref:'Event', required:true},
    qrCodeUrl:{type:String},
    // rsvpId: {type:String, required:true},
    isUsed:{type:Boolean, default:false},
    expiresAt:{type:Date, required:true}
},
{timestamps:true});


export default mongoose.model('RSVP', RSVPSchema);
