import eventModel from "../models/event.model";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { EventService } from "../services/event.service";
import IEvent from "../interfaces/event.interface";
import { Request, Response } from "express";
import IUser from "../interfaces/user.interface";



// Create a class to manage event-related operations

export class EventController {
    // Create a new event

    private eventService:EventService;

    constructor(){
        this.eventService = new EventService();
    }


    // create a new event
    createEvent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const event = await this.eventService.createEvent(req.body as IEvent, req.user as IUser);
        res.json(new ApiResponse(201, event, "Event created successfully"));
    });



    // Get all events
    getAllEvents = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 2;
        console.log(`Page: ${page}, Limit: ${limit}`);
        const events = await this.eventService.getAllEvents(page, limit);
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
    });


    // Get a single event
    getEvent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const event = await this.eventService.getEvent(req.params.eventId);

        // is the user the owner of the event
        const isOwner = true;

        const actions = isOwner? ['edit', 'delete']: ['RSVP', 'unRSVP'];

        res.json(new ApiResponse(200, event, "Event fetched successfully", actions));
    });


    // fetch live events only
    getLiveEvents = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getLiveEvents();
        res.json(new ApiResponse(200, events, "Live events fetched successfully"));
    });


    // if the date of the event is now or will be in 30 minutes, it is considered live and set the status to live
    // if the date of the event is in the future, set the status to upcoming
    // if the date of the event is in the past, set the status to past
    // this function is called every 30 minutes to update the status of the events
    // this is to ensure that the status of the events are always up to date
    setEventStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.setEventStatus();
        res.json(new ApiResponse(200, events, "Event status updated successfully"));
    });




    getUpcomingEvent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getUpcomingEvents(req.user as IUser);
        res.json(new ApiResponse(200, events, "Upcoming events fetched successfully"));
    });


    // RSVP to an event
    rsvp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const rsvp = await this.eventService.rsvp(req.params.id, req.user as IUser);
        res.json(new ApiResponse(200, rsvp, "RSVP successful"));
    });


    // Remove RSVP to an event
    removeRsvp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const event = await this.eventService.removeRsvp(req.params.id, req.user as IUser);
        res.json(new ApiResponse(200, event, "RSVP removed successfully"));
    });


    // Get all events a user has RSVP'd to
    getMyEvents = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const rsvps = await this.eventService.getMyEvents(req.user as IUser);
        res.json(new ApiResponse(200, rsvps, "Events fetched successfully"));
    });

    // Get all events a user has created
    getMyCreatedEvents = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getMyCreatedEvents(req.user as IUser);
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
    });


    // Update an event
    updateEvent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const event = await this.eventService.updateEvent(req.params.id, req.body as IEvent);
        res.json(new ApiResponse(200, event, "Event updated successfully"));
    });


    // Delete an event
    deleteEvent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        await this.eventService.deleteEvent(req.params.id);
        res.json(new ApiResponse(200, null, "Event deleted successfully"));
    });


    // Get all events of a particular type
    getEventsByType = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getEventsByType(req.params.type);
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
    });


    // Get all events happening today
    getEventsToday = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getEventsToday();
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
    });


    // Get all events happening this week
    getEventsThisWeek = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getEventsThisWeek();
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
    });


    // Get all events happening this month
    getEventsThisMonth = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getEventsThisMonth();
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
    });

    // get all 3 events whose tickets are sold the most
    getTopEventsOfTheWeek = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const events = await this.eventService.getTopEventsOfTheWeek();
        res.json(new ApiResponse(200, events, "Events fetched successfully"));
    });


    // check if a user has RSVP'd to an event
    checkRsvp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const rsvp = await this.eventService.checkRsvp(req.params.id, req.user as IUser);
        res.json(new ApiResponse(200, rsvp, "RSVP status fetched successfully"));
    });


    verifyRsvp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { rsvpId } = req.params;
        const rsvp = await this.eventService.verifyTicket(rsvpId);
        res.json(new ApiResponse(200, rsvp, "Ownership status fetched successfully"));
    });



}
