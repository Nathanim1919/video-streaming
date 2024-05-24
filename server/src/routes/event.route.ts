import express from 'express';
import { EventController } from '../controllers/event.controller';


const router = express.Router();
const eventController = new EventController();


// Event routes
router.post('/create', [eventController.createEvent.bind(eventController)]);
router.get('/all', [eventController.getAllEvents.bind(eventController)]);
router.get('/:id', [eventController.getEvent.bind(eventController)]);
router.post('/:id/rsvp', [eventController.rsvp.bind(eventController)]);
router.post('/:id/remove-rsvp', [eventController.removeRsvp.bind(eventController)]);
router.get('/my-events', [eventController.getMyEvents.bind(eventController)]);
router.get('/my-created-events', [eventController.getMyCreatedEvents.bind(eventController)]);



export default router;