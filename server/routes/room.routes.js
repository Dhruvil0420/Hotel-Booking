import express from 'express'
import { creatRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from '../controllers/room.controllers.js';
import upload from '../middelware/upload.middelware.js';
import requireAuth from '../middelware/user.middelware.js';



const roomRoutes = express.Router();

roomRoutes.post("/register",upload.array("images",4),requireAuth,creatRoom);
roomRoutes.get("/rooms",getRooms);
roomRoutes.get("/owner-rooms",requireAuth,getOwnerRooms);
roomRoutes.post("/toggle-availability",requireAuth,toggleRoomAvailability);

export default roomRoutes;