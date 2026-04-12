import express from 'express'


import { registerHotel } from '../controllers/hotel.controllers.js';
import requireAuth from '../middelware/user.middelware.js';

const hotelRotes = express.Router();

hotelRotes.post("/register",requireAuth,registerHotel);

export default hotelRotes;
