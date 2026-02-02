"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//================== Authentication Middleware ====================
const authMiddleware = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Store user data inside request
        req.user = decoded;
        next(); // Continue to controller
    }
    catch (err) {
        console.error("Auth error:", err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authMiddleware = authMiddleware;
