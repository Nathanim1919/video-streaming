import { CacheClient } from "../config/redisClient";
import { StreamService } from "../services/stream.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

// Extend Request interface to include user property
interface RequestWithUser extends Request {
  user?: {
    _id: string;
  };
}

export class StreamController {
  streamService: StreamService;
  cacheClient: CacheClient;

  constructor(streamService: StreamService) {
    this.streamService = streamService;
    this.cacheClient = CacheClient.getInstance();
  }

  getStreams = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // get all streams from cache or database
      let streams;
      const streamsFromCache = await this.cacheClient.exists("streams");
      if (streamsFromCache) {
        const cachedStreams = await this.cacheClient.get("streams");
        streams = JSON.parse(cachedStreams);
      } else {
        streams = await this.streamService.getStreams();
        await this.cacheClient.set("streams", JSON.stringify(streams));
      }
      res.json(new ApiResponse(200, streams, "Streams fetched successfully"));
    }
  );

  getStream = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // get from cache is exists, else get from database
      let stream;
      const streamExists = await this.cacheClient.exists(
        `stream:${req.params.id}`
      );
      if (streamExists) {
        const cachedStream = await this.cacheClient.get(
          `stream:${req.params.id}`
        );
        stream = JSON.parse(cachedStream);
      } else {
        stream = await this.streamService.getStreamById(req.params.id);
        await this.cacheClient.set(
          `stream:${req.params.id}`,
          JSON.stringify(stream)
        );
      }
      res.json(new ApiResponse(200, stream, "Stream fetched successfully"));
    }
  );

  createStream = asyncHandler(
    async (req: RequestWithUser, res: Response): Promise<void> => {
      const stream = await this.streamService.createStream(
        req.user?._id as string,
        req.body
      );
      // save the stream in cache
      await this.cacheClient.set(`stream:${stream?._id}`, JSON.stringify(stream));
      res.json(new ApiResponse(201, stream, "Stream created successfully"));
    }
  );

  updateStream = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const stream = await this.streamService.updateStream(
        req.params.id,
        req.body
      );
      // update the stream in cache
      await this.cacheClient.set(`stream:${req.params.id}`, JSON.stringify(stream));
      res.json(new ApiResponse(200, stream, "Stream updated successfully"));
    }
  );

  deleteStream = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await this.streamService.deleteStream(req.params.id);
      // delete the stream from cache
      await this.cacheClient.delete(`stream:${req.params.id}`);
      res.json(new ApiResponse(200, null, "Stream deleted successfully"));
    }
  );

  rsvpStream = asyncHandler(
    async (req: RequestWithUser, res: Response): Promise<void> => {
      console.log("loggedUser: ",req.user);
      console.log("Rsvped Event Id: ",req.params.id);
      const rsvp = await this.streamService.rsvpStream(
        req.params.id,
        req.user?._id as string
      );
      // update user and stream in cache
      // await this.cacheClient.set(`user:${req.user?._id}`, JSON.stringify(rsvp.user));
      // await this.cacheClient.set(`stream:${req.params.id}`, JSON.stringify(rsvp.stream));
      res.json(new ApiResponse(200, rsvp, "RSVP successful"));
    }
  );

   // Add a guest to an event
   addGuest = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      console.log("Inside the controller, i got this event id: ", req.params.id);
      const event = await this.streamService.addGuest(
        req.params.id,
        req.body
      );
      console.log(event)
      res.json(new ApiResponse(200, event, "Guest added successfully"));
    }
  )

  addSchedule = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.streamService.addSchedule(
        req.params.id,
        req.body
      );
      // save the event in the cache
      const eventCacheKey = `event:${req.params.id}`;
      const eventCacheValue = JSON.stringify(event);
      await this.cacheClient.set(eventCacheKey, eventCacheValue);
      res.json(new ApiResponse(200, event, "Schedule added successfully"));
    }
  )

  editSchedule = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.streamService.editSchedule(
        req.params.id,
        req.body
      );
      // save the event in the cache
      const eventCacheKey = `event:${req.params.id}`;
      const eventCacheValue = JSON.stringify(event);
      await this.cacheClient.set(eventCacheKey, eventCacheValue);
      res.json(new ApiResponse(200, event, "Schedule edited successfully"));
    }
  )
}
