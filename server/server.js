import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/ClerkWebhooks.js';

connectDB();

const app = express();

//Enable Corss-Origin Resource Sharing

app.use(cors());

// API to listen to Clerk Webhooks
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
); 

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get('/',(req,res) => {
    res.send("API is working");
})

const PORT = process.env.PORT || 3000 ;

app.listen(PORT,() => {
    console.log(`server running on Port ${PORT}`);  
})