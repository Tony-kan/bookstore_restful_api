import {Router} from "express";
import {loginUser, logoutUser, registerUser} from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)


authRouter.post("/logout", logoutUser)


export default authRouter;