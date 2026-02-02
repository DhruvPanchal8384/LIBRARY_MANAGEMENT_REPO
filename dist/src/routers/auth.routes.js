"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = (0, express_1.Router)();
const AuthController = new auth_controller_1.authController();
//================== Register User =================
authRoutes.post("/register", AuthController.register);
//================== Login User ====================
authRoutes.post("/login", AuthController.login);
//================== Logout User ===================
authRoutes.post("/logout", AuthController.logout);
exports.default = authRoutes;
