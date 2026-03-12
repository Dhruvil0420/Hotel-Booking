import express from "express"
import { getuserData, storeResentSerachedCities } from "../controllers/user.controllers.js";
import requireAuth from "../middleware/User.middleware.js";

const userRouter = express.Router();

userRouter.get("/",requireAuth,getuserData);
userRouter.post("/store-recent-search",requireAuth,storeResentSerachedCities);


export default userRouter;