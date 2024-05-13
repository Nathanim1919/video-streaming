import express from 'express';
import { createEvent, getAllEvents,handleRSVP } from '../controllers/eventController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post('/create',verifyJWT, createEvent);
router.get('/all', verifyJWT,getAllEvents)
router.post('/:eventId/rsvp', verifyJWT, handleRSVP)



export default router;