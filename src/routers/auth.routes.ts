import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const authRoutes = Router();
const AuthController = new authController();

//================== Register User =================
authRoutes.post("/register", AuthController.register);

//================== Login User ====================
authRoutes.post("/login", AuthController.login);

//================== Logout User ===================
authRoutes.post("/logout", AuthController.logout);

export default authRoutes;
