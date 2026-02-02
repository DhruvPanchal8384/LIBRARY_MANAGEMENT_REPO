import { Router } from "express";
import bookRoutes from "./book.routes";
import memberRouter from "./member.routes";
import borrowRouter from "./borrow.routes";
import authRoutes from "./auth.routes";
import { authMiddleware } from "../middleware/auth.middleware";

export const mainRoutes = Router();

//================== Protected Routes ====================
mainRoutes.use("/book", authMiddleware, bookRoutes);
mainRoutes.use("/member", authMiddleware, memberRouter);
mainRoutes.use("/borrow", authMiddleware, borrowRouter);
mainRoutes.use("/auth", authRoutes);


export default mainRoutes;
