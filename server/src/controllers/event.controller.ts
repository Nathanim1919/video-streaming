import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { EventService } from "../services/event.service";
import IEvent from "../interfaces/event.interface";
import { Request, Response } from "express";
import IUser from "../interfaces/user.interface";
import { CacheClient } from "../config/redisClient";
import logger from "../logger";
import { read } from "fs";

interface RequestWithUser extends Request {
  user: IUser;
}

// Create a class to manage event-related operations

export class EventController {
  // Create a new event

  private eventService: EventService;
  private cacheClient: CacheClient;

  constructor() {
    this.eventService = new EventService();
    this.cacheClient = CacheClient.getInstance();
  }

  // create a new event
  createEvent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.eventService.createEvent(
        req.body as IEvent,
        req.user as IUser
      );

      // save the event in the cache
      const eventCacheKey = `event:${event._id}`;
      const eventCacheValue = JSON.stringify(event);
      await this.cacheClient.set(eventCacheKey, eventCacheValue);

      res.json(new ApiResponse(201, event, "Event created successfully"));
    }
  );

  // Get all events
  getAllEvents = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // get from cache if it exits
      const existsInCache = await this.cacheClient.exists("events");

      if (existsInCache) {
        const events = await this.cacheClient.get("events");
        res.json(
          new ApiResponse(
            200,
            JSON.parse(events),
            "Events fetched successfully"
          )
        );
      } else {
        // get from the database if it does not exist in the cache
        const events = await this.eventService.getAllEvents();

        // save the events in the cache
        await this.cacheClient.set("events", JSON.stringify(events));
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
      }
    }
  );

  // Get a single event
  getEvent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // get from cache if it exits
      const existsInCache = await this.cacheClient.exists(
        `event:${req.params.eventId}`
      );

      if (existsInCache) {
        let event = await this.cacheClient.get(`event:${req.params.eventId}`);
        event = JSON.parse(event);
        res.json(new ApiResponse(200, event, "Event fetched successfully"));
      } else {
        // get from the database if it does not exist in the cache
        const event = await this.eventService.getEvent(req.params.eventId);

        // is the user the owner of the event
        const isOwner = true;

        const actions = isOwner ? ["edit", "delete"] : ["RSVP", "unRSVP"];

        // save the event in the cache
        await this.cacheClient.set(
          `event:${req.params.eventId}`,
          JSON.stringify(event)
        );

        res.json(
          new ApiResponse(200, event, "Event fetched successfully", actions)
        );
      }
    }
  );

  // fetch live events only
  getLiveEvents = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // get from cache if it exits
      const existsInCache = await this.cacheClient.exists("liveEvents");
      if (existsInCache) {
        const events = await this.cacheClient.get("liveEvents");
        res.json(
          new ApiResponse(200, events, "Live events fetched successfully")
        );
      } else {
        const events = await this.eventService.getLiveEvents();

        // save the events in the cache
        await this.cacheClient.set("liveEvents", JSON.stringify(events));
        res.json(
          new ApiResponse(200, events, "Live events fetched successfully")
        );
      }
    }
  );

  getUpcomingEvent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // get from cache if it exits
      const existsInCache = await this.cacheClient.exists("upcomingEvents");
      if (existsInCache) {
        const events = await this.cacheClient.get("upcomingEvents");
        res.json(
          new ApiResponse(
            200,
            JSON.parse(events),
            "Upcoming events fetched successfully"
          )
        );
      } else {
        const events = await this.eventService.getUpcomingEvents(
          req.user as IUser
        );

        // save the events in the cache
        await this.cacheClient.set("upcomingEvents", JSON.stringify(events));
        res.json(
          new ApiResponse(200, events, "Upcoming events fetched successfully")
        );
      }
    }
  );

  // RSVP to an event
  rsvp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const rsvp = await this.eventService.rsvp(req.params.id, req.user as IUser);
    res.json(new ApiResponse(200, rsvp, "RSVP successful"));
  });

  // Remove RSVP to an event
  removeRsvp = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.eventService.removeRsvp(
        req.params.id,
        req.user as IUser
      );
      res.json(new ApiResponse(200, event, "RSVP removed successfully"));
    }
  );

  // Get all events a user has RSVP'd to
  getMyEvents = asyncHandler(
    async (req: RequestWithUser, res: Response): Promise<void> => {
      // get from cache if it exits
      const existsInCache = await this.cacheClient.exists(
        `rsvps:${req.user._id}`
      );
      if (existsInCache) {
        const events = await this.cacheClient.get(`rsvps:${req.user._id}`);
        res.json(
          new ApiResponse(
            200,
            JSON.parse(events),
            "Events fetched successfully"
          )
        );
      } else {
        const rsvps = await this.eventService.getMyEvents(req.user as IUser);

        // save the events in the cache
        await this.cacheClient.set(
          `rsvps:${req.user._id}`,
          JSON.stringify(rsvps)
        );
        res.json(new ApiResponse(200, rsvps, "Events fetched successfully"));
      }
    }
  );

  // Get all events a user has created
  getMyCreatedEvents = asyncHandler(
    async (req: RequestWithUser, res: Response): Promise<void> => {
      // get from cache if it exits
      const existsInCache = await this.cacheClient.exists(
        `createdEvents:${req.user._id}`
      );

      if (existsInCache) {
        const events = await this.cacheClient.get(
          `createdEvents:${req.user._id}`
        );
        res.json(
          new ApiResponse(
            200,
            JSON.parse(events),
            "Events fetched successfully"
          )
        );
      } else {
        const events = await this.eventService.getMyCreatedEvents(
          req.user as IUser
        );

        // save the events in the cache
        await this.cacheClient.set(
          `createdEvents:${req.user._id}`,
          JSON.stringify(events)
        );
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
      }
    }
  );

  // Update an event
  updateEvent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.eventService.updateEvent(
        req.params.id,
        req.body as IEvent
      );
      res.json(new ApiResponse(200, event, "Event updated successfully"));
    }
  );

  // Delete an event
  deleteEvent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await this.eventService.deleteEvent(req.params.id);
      res.json(new ApiResponse(200, null, "Event deleted successfully"));
    }
  );

  // Get all events of a particular type
  getEventsByType = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const events = await this.eventService.getEventsByType(req.params.type);
      res.json(new ApiResponse(200, events, "Events fetched successfully"));
    }
  );

  // Get all events happening today
  getEventsToday = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const events = await this.eventService.getEventsToday();
      res.json(new ApiResponse(200, events, "Events fetched successfully"));
    }
  );

  // Get all events happening this week
  getEventsThisWeek = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const events = await this.eventService.getEventsThisWeek();
      res.json(new ApiResponse(200, events, "Events fetched successfully"));
    }
  );

  // Get all events happening this month
  getEventsThisMonth = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const events = await this.eventService.getEventsThisMonth();
      res.json(new ApiResponse(200, events, "Events fetched successfully"));
    }
  );

  // get all 3 events whose tickets are sold the most
  getTopEventsOfTheWeek = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const events = await this.eventService.getTopEventsOfTheWeek();
      res.json(new ApiResponse(200, events, "Events fetched successfully"));
    }
  );

  // check if a user has RSVP'd to an event
  checkRsvp = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const rsvp = await this.eventService.checkRsvp(
        req.params.id,
        req.user as IUser
      );
      res.json(new ApiResponse(200, rsvp, "RSVP status fetched successfully"));
    }
  );

  verifyRsvp = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { rsvpId } = req.params;
      const rsvp = await this.eventService.verifyTicket(rsvpId);
      res.json(
        new ApiResponse(200, rsvp, "Ownership status fetched successfully")
      );
    }
  );

  // Add a guest to an event
  addGuest = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.eventService.addGuest(
        req.params.id,
        req.body
      );
      // save the event in the cache
      const eventCacheKey = `event:${req.params.id}`;
      const eventCacheValue = JSON.stringify(event);
      await this.cacheClient.set(eventCacheKey, eventCacheValue);
      res.json(new ApiResponse(200, event, "Guest added successfully"));
    }
  )

  addSchedule = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.eventService.addSchedule(
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
      const event = await this.eventService.editSchedule(
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


  editSpecialInstruction = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const event = await this.eventService.editSpecialInstruction(
        req.params.id,
        req.body.data
      );

      // save the event in the cache
      const eventCacheKey = `event:${req.params.id}`;
      const eventCacheValue = JSON.stringify(event);
      await this.cacheClient.set(eventCacheKey, eventCacheValue);
      res.json(new ApiResponse(200, event, "Schedule edited successfully"));
    }
  )
}
