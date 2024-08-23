import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (process.env.MONGO_URL){
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message);
    });
  }

export default mongoose.connection;