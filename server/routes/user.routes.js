import express from "express"
import { getuserData, storeResentSerachedCities } from "../controllers/user.controllers.js";
import requireAuth from "../middelware/user.middelware.js";


const userRouter = express.Router();

userRouter.get("/",requireAuth,getuserData);
userRouter.post("/store-recent-search",requireAuth,storeResentSerachedCities);


export default userRouter;