import express from "express";
import { StreamController } from "../controllers/stream.controller";
import { verifyJWT } from "../auth/guards/jwt-auth.guard";
import { StreamService } from "../services/stream.service";

// create a new Router
const router = express.Router();
const streamService = new StreamService();

// create a new StreamController
const streamController = new StreamController(streamService);

// Stream routes
router.get("/", verifyJWT, [
  streamController.getStreams.bind(streamController),
]);

router.get("/:id", verifyJWT, [
  streamController.getStream.bind(streamController),
]);

router.post("/create", verifyJWT, [
  streamController.createStream.bind(streamController),
]);

router.put("/:id/update", verifyJWT, [
  streamController.updateStream.bind(streamController),
]);

router.delete("/:id/delete", verifyJWT, [
  streamController.deleteStream.bind(streamController),
]);

router.post("/:id/rsvp", verifyJWT, [
  streamController.rsvpStream.bind(streamController),
]);

router.post("/:id/add-guest", verifyJWT, [
  streamController.addGuest.bind(streamController)
])

router.post("/:id/add-schedule", verifyJWT, [
  streamController.addSchedule.bind(streamController)
])

router.put("/:id/edit-schedule", verifyJWT, [
  streamController.editSchedule.bind(streamController)
])

// Export the router
export default router;
