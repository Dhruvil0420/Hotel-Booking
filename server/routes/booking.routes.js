import express from 'express'
import { checkAvailabilityAPI, createBooking, getBookings, getHotelBookings, stripePayment } from '../controllers/booking.controllers.js';
import requireAuth from '../middelware/user.middelware.js';


const bookingRoutes = express.Router();

bookingRoutes.post("/check-room-Availability",checkAvailabilityAPI);
bookingRoutes.post("/book",requireAuth,createBooking);
bookingRoutes.get("/user",requireAuth,getBookings);
bookingRoutes.get("/hotel",requireAuth,getHotelBookings);
bookingRoutes.post("/stripe-payment",requireAuth,stripePayment);

export default bookingRoutes;