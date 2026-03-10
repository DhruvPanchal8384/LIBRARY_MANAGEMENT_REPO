import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//================== Authentication Middleware ====================
export const authMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const secretKey = process.env.JWT_SECRET || "mysecret";
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;

    next(); 
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
