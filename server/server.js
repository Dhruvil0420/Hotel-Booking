import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/ClerkWebhooks.js';
import userRouter from './routes/user.routes.js';
import hotelRotes from './routes/hotel.routes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import stripeWebhooks from './controllers/StripeWebhooks.js';


connectDB();
connectCloudinary();

const app = express();

//Enable Corss-Origin Resource Sharing

app.use(cors());

// API to listen to Stripe Webhookes
app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to Clerk Webhooks

app.post('/api/clerk', clerkWebhooks);

// All Routes
app.get('/', (req, res) => {
    res.send("API is working");
})
app.use('/api/user', userRouter);
app.use('/api/hotel', hotelRotes);
app.use('/api/room', roomRoutes);
app.use('/api/booking', bookingRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on Port ${PORT}`);
})