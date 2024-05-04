import mongoose, {Document, ObjectId, Schema} from 'mongoose'
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: string;
    email: string;
    fullName: string;
    password: string;
    profession: string;
    followers: ObjectId[];
    events: ObjectId[];
    raing: number;
    comparePassword: (password: string) => Promise<boolean>;
}




const UserSchema: Schema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    events:[{
        type:Schema.Types.ObjectId,
        ref:'Event'
    }],
    rating:{
        type:Number,
        default:0
    }
}, {timestamps:true});

UserSchema.methods.comparePassword = function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};


export default mongoose.model<IUser>('User', UserSchema);