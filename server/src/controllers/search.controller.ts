import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import eventModel from "../models/event.model";
import streamModel from "../models/stream.model";
import { User } from "../models/user.model";

export class SearchController {
  static search = async (req: Request, res: Response) => {
    try {
      const query = req.query.q; 
      // search for events
      const events = await eventModel.find({
        title: { $regex: query, $options: "i" },
      });

      // search for streamers
      const streamers = await User.find({
        fullName: { $regex: query, $options: "i" },
      });

      // search for organisations
      const streames = await streamModel.find({
        title: { $regex: query, $options: "i" },
      });

      // combine the results
      const results = {
        events,
        streamers,
        streames,
      };

      // return the result
      res.json(new ApiResponse(200, results, "Search results"));
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };


  static personalSearch = async (req: Request, res: Response) => {
    try {
      const query = req.query.q; 
      // search for events
      const events = await eventModel.find({
        title: { $regex: query, $options: "i" },
        owner: req.user,
      });

     

      // search for organisations
      const streames = await streamModel.find({
        title: { $regex: query, $options: "i" },
        owner: req.user,
      });

      // combine the results as one array
      const results = [...events, ...streames];
      console.log("results: ", results);
      // return the result
      res.json(new ApiResponse(200, results, "Search results"));
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
