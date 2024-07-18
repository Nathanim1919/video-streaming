import express from "express";
import { EventController } from "../controllers/event.controller";
import { verifyJWT } from "../auth/guards/jwt-auth.guard";

const router = express.Router();
const eventController = new EventController();

// Event routes
router.post("/create", verifyJWT, [
  eventController.createEvent.bind(eventController),
]);
router.get("/all", verifyJWT, [
  eventController.getAllEvents.bind(eventController),
]);
router.get("/upcoming", verifyJWT, [
  eventController.getUpcomingEvent.bind(eventController),
]);
router.get("/my-events", verifyJWT, [
  eventController.getMyEvents.bind(eventController),
]);
router.get("/top-events", [
  eventController.getTopEventsOfTheWeek.bind(eventController),
]);
router.get("/my-created-events", verifyJWT, [
  eventController.getMyCreatedEvents.bind(eventController),
]);

router.get("/:eventId", verifyJWT, [
  eventController.getEvent.bind(eventController),
]);
router.post("/:id/rsvp", verifyJWT, [
  eventController.rsvp.bind(eventController),
]);

router.post("/:id/add-guest", verifyJWT, [
  eventController.addGuest.bind(eventController),
]);

router.get("verify-rsvp/:rsvpId", verifyJWT, [
  eventController.verifyRsvp.bind(eventController),
]);

router.delete("/:id/remove-rsvp", verifyJWT, [
  eventController.removeRsvp.bind(eventController),
]);

router.post("/:id/check-rsvp", verifyJWT, [
  eventController.checkRsvp.bind(eventController),
]);

router.post("/:id/add-schedule", verifyJWT, [
  eventController.addSchedule.bind(eventController),
]);

export default router;
