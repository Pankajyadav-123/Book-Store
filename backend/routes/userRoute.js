import express from "express";
import {Signup,login,adminLogin,verifyToken} from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/login",login);
userRouter.post("/admin",adminLogin);
userRouter.post("/verify-token", verifyToken);

export default userRouter;