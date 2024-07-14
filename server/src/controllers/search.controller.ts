import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import eventModel from "../models/event.model";
import streamModel from "../models/stream.model";
import { User } from "../models/user.model";
import logger from "../logger";

export class SearchController {
  static search = async (req: Request, res: Response) => {
    logger.info("Searching for events, streamers and organisations");
    try {
        const query = req.query.q; 
      logger.info(`Search query: ${query}`);
      // search for events
      const events = await eventModel.find({
        title: { $regex: query, $options: "i" },
      });

      // search for streamers
      const streamers = await User.find({
        fullName: { $regex: query, $options: "i" },
      });

      // search for organisations
      const organisations = await streamModel.find({
        name: { $regex: query, $options: "i" },
      });

      // combine the results
      const results = {
        events,
        streamers,
        organisations,
      };

      // return the result
      res.json(new ApiResponse(200, results, "Search results"));
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
