import IEvent from "../interfaces/event.interface";
import streamModel from "../models/stream.model";
import { User } from "../models/user.model";
import mongoose, { ObjectId, Schema, startSession } from "mongoose";
import { defaultEventImages } from "../utils/defaultImages";

export class StreamService {
  // Get all streams
  public async getStreams() {
    return await streamModel.find().populate("owner");
  }

  // Get a single stream
  public async getStreamById(id: string) {
    return await streamModel.findById(id).populate("owner");
  }

  // Create a new stream
  public async createStream(userId: string, data: IEvent): Promise<IEvent> {
    // set the owner of the stream.
    const session = await startSession();
    try {
      const newStream = await streamModel.create(data);



      const user = await User.findById(userId).session(session);

      if (!user) {
        throw new Error("User not found");
      }

      user.streams?.push(newStream._id);
      newStream.owner = user._id as unknown as mongoose.Types.ObjectId;
      newStream.image = defaultEventImages[data.eventType];

      await user.save({ session });
      await newStream.save({ session });
      return newStream;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Update an existing stream
  public async updateStream(id: string, data: IEvent): Promise<IEvent | null> {
    return await streamModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete a stream
  public async deleteStream(id: string) {
    return await streamModel.findByIdAndDelete(id);
  }

  // rsvp to a stream
  public async rsvpStream(id: string, userId: string) {
    const session = await startSession();
    try {
      console.log("loggedUser: ", userId);
      console.log("Rsvped Event Id: ", id);

      session.startTransaction();
      const user = await User.findById(userId).session(session);
      const stream = await streamModel.findById(id).session(session);

      if (!user || !stream) {
        throw new Error("User or Stream not found");
      }

      if (stream.attendees.includes(userId) || user.rvps.includes(id)) {
        throw new Error("User already RSVP'd");
      }

      user.rvps.push(id);
      stream.attendees.push(userId);

      await stream.save({ session });
      await user.save({ session });

      await session.commitTransaction();
      return "RSVP successful";
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async addGuest(
    eventId: string,
    data: { name: string; profession: string }
  ) {
    try {
      const event = await streamModel.findOne({ _id: eventId });
      if (!event) {
        throw new Error("Event not found");
      }

      event.guests.push(data);
      await event.save();
      return event;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error has occurred");
      }
    }
  }

  public async addSchedule(
    eventId: string,
    data: { time: string; activity: string }
  ) {
    try {
      const event = await streamModel.findOne({ _id: eventId });
      if (!event) {
        throw new Error("Event not found");
      }

      event.schedule.push(data);
      await event.save();
      return event;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error has occurred");
      }
    }
  }

  public async editSchedule(
    eventId: string,
    data: { time: string; activity: string }[]
  ) {
    try {
      const event = await streamModel.findOne({ _id: eventId });
      if (!event) {
        throw new Error("Event not found");
      }

      event.schedule = data;
      await event.save();
      return event;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error has occurred");
      }
    }
  }

  public async editSpecialInstruction(eventId: string, data: string) {
    try {
      const stream = await streamModel.findOneAndUpdate(
        { _id: eventId },
        { specialInstructions: data },
        { new: true }
      );
      return stream;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error has occured");
      }
    }
  }

  public async bookMark(
    streamId: string,
    userId: string,
    type: "Event" | "Stream" = "Stream"
  ) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Ensure the bookmark type is either 'Event' or 'Stream'
      if (type !== "Event" && type !== "Stream") {
        throw new Error("Invalid bookmark type");
      }

      const bookmark = {
        type: type,
        item: new mongoose.Types.ObjectId(streamId),
      };

      // Save to user's bookmarks
      user.bookmarks.push(bookmark);
      await user.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error has occurred");
      }
    }
  }

  public async removeFromBookMark(
    streamId: string,
    userId: string,
    type: "Event" | "Stream" = "Stream"
  ) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Ensure the bookmark type is either 'Event' or 'Stream'
      if (type !== "Event" && type !== "Stream") {
        throw new Error("Invalid bookmark type");
      }

      // Remove the bookmark
      user.bookmarks = user.bookmarks.filter((bookmark) => {
        return bookmark.item.toString() !== streamId && bookmark.type !== type;
      });

      await user.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error has occurred");
      }
    }
  }

  public async getSimilartStreamesBasedOnTag(streamId: string) {
    try {
      const stream = await streamModel.findOne({ _id: streamId });
      if (!stream) {
        throw new Error("Stream not found");
      }

      const similarStreams = await streamModel.find({
        tags: { $in: stream.tags },
        _id: { $ne: streamId },
      });

      return similarStreams;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error has occurred");
      }
    }
  }
}
