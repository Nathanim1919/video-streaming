// Purpose: Define the User model schema and export it as a model.
import mongoose, {Schema} from 'mongoose'
import { AvailableSocialLogins, userLoginTypes } from '../../constants';
import IUser, { IBookmark } from '../interfaces/user.interface.js';


// bookmark interface


const bookmarkSchema = new Schema<IBookmark>({
    type:{
        type: String,
        required: true,
        enum: ['Event', 'Stream']
    },
    item:{
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'bookmarks.type'
    }
})



// Define the schema
const UserSchema = new Schema<IUser>({
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
    // the book mark can be an array of event ids or an array of stream ids
    bookmarks:[bookmarkSchema],
    username:{
        type:String,
        required:true,
        unique:true
    },
    bio:{
        type:String,
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
    profilePicture:{
        public_id:{
            type:String
        },
        url:{
            type:String,
            required:true,
            default:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
        }
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

