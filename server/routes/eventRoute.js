import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post('/create',verifyJWT, createEvent);
router.get('/all', getAllEvents)



export default router;