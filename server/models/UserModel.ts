import mongoose, {Document, Schema} from 'mongoose'

export interface IUser extends Document {
    email: string;
    password: string;
    profession: string;
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
    }
});


export default mongoose.model<IUser>('User', UserSchema);