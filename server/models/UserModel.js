// Purpose: Define the User model schema and export it as a model.
import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define the schema
const UserSchema = new Schema({
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
    },
    refreshToken: {
        type: String,
    },
}, {timestamps:true});


// Hash the password before saving the user
UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare the password
UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Generate the access token
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id,
                        email: this.email,
     }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}


UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id
     }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

}

// Generate the refresh token
export default mongoose.model('User', UserSchema);