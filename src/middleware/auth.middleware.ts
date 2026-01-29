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

    // Format should be: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const secretKey = process.env.JWT_SECRET || "mysecret";
    const decoded = jwt.verify(token, secretKey);

    // Store user data inside request
    req.user = decoded;

    next(); // Continue to controller
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
