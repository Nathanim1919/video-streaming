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

  constructor(streamService: StreamService) {
    this.streamService = streamService;
  }

  getStreams = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const streams = await this.streamService.getStreams();
      res.json(new ApiResponse(200, streams, "Streams fetched successfully"));
    }
  );

  getStream = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const stream = await this.streamService.getStreamById(req.params.id);
      res.json(new ApiResponse(200, stream, "Stream fetched successfully"));
    }
  );

  createStream = asyncHandler(
    async (req: RequestWithUser, res: Response): Promise<void> => {
      const stream = await this.streamService.createStream(
        req.user?._id as string,
        req.body
      );
      res.json(new ApiResponse(201, stream, "Stream created successfully"));
    }
  );

  updateStream = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const stream = await this.streamService.updateStream(
        req.params.id,
        req.body
      );
      res.json(new ApiResponse(200, stream, "Stream updated successfully"));
    }
  );

  deleteStream = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await this.streamService.deleteStream(req.params.id);
      res.json(new ApiResponse(200, null, "Stream deleted successfully"));
    }
  );

  rsvpStream = asyncHandler(
    async (req: RequestWithUser, res: Response): Promise<void> => {
      const rsvp = await this.streamService.rsvpStream(
        req.params.id,
        req.user?._id as string
      );
      res.json(new ApiResponse(200, rsvp, "RSVP successful"));
    }
  );
}
