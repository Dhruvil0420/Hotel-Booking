import express from 'express'
import { creatRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from '../controllers/room.controllers.js';
import upload from '../middleware/upload.middleware.js';
import requireAuth from '../middleware/User.middleware.js';

const roomRoutes = express.Router();

roomRoutes.post("/register",upload.array("images",4),requireAuth,creatRoom);
roomRoutes.get("/rooms",getRooms);
roomRoutes.get("/owner-rooms",requireAuth,getOwnerRooms);
roomRoutes.post("/toggle-availability",requireAuth,toggleRoomAvailability);

export default roomRoutes;