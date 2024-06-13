// Purpose: Define the User model schema and export it as a model.
import mongoose, {Schema, Document} from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AvailableSocialLogins, userLoginTypes } from '../../constants';
import User from '../interfaces/user.interface.js';

// Define the schema
const UserSchema = new Schema<User>({
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
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    loginType:{
        type: String,
        enum: AvailableSocialLogins,
        default: userLoginTypes.EMAIL_PASSWORD,
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    events:[{
        type:Schema.Types.ObjectId,
        ref:'Event'
    }],
    streams:[{
        type:Schema.Types.ObjectId,
        ref:'Stream'
    }],
    rvps:[{
        type:Schema.Types.ObjectId,
        ref:'Event'
    }],
    rating:{
        type:Number,
        default:0
    },
    refreshToken: {
        type: String,
    },
    socialMedia: {
        type: Map,
        of: String
    },
}, {timestamps:true});


// // Hash the password before saving the user
// UserSchema.pre('save', async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// // Compare the password
// UserSchema.methods.comparePassword = async function(password){
//     return await bcrypt.compare(password, this.password);
// }

// // Generate the access token
// UserSchema.methods.generateAccessToken = function () {
//     return jwt.sign({_id: this._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
// }


// UserSchema.methods.generateRefreshToken = function () {
//     return jwt.sign({ _id: this._id
//      }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

// }

// Generate the refresh token
export const User = mongoose.model('User', UserSchema);

