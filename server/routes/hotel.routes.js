import express from 'express'

import requireAuth from '../middleware/User.middleware.js';
import { registerHotel } from '../controllers/hotel.controllers.js';

const hotelRotes = express.Router();

hotelRotes.post("/register",requireAuth,registerHotel);

export default hotelRotes;
