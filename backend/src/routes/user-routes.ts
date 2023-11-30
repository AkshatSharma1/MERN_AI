import { Router } from "express";
import { getAllUsers, userSignUp, userLogIn, verifyUser, userLogout } from "../controllers/user-controller";
import { validate, signupValidator, loginValidator } from '../utils/validator'

import { verifyToken } from "../utils/token.manager";

const userRoutes = Router();

//Creating requests
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogIn);

//route to verify token if user has previously logged ina nd his token hasn't expired yet
userRoutes.get("/auth-status", verifyToken, verifyUser)

userRoutes.get("/logout", verifyToken, userLogout)

export default userRoutes;
