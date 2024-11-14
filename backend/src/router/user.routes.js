import { Router } from "express";
import {registerUser,logInUser} from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/logInUser').post(logInUser);




export default userRouter;