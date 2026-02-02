"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoutes = void 0;
const express_1 = require("express");
const book_routes_1 = __importDefault(require("./book.routes"));
const member_routes_1 = __importDefault(require("./member.routes"));
const borrow_routes_1 = __importDefault(require("./borrow.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.mainRoutes = (0, express_1.Router)();
//================== Protected Routes ====================
exports.mainRoutes.use("/book", auth_middleware_1.authMiddleware, book_routes_1.default);
exports.mainRoutes.use("/member", auth_middleware_1.authMiddleware, member_routes_1.default);
exports.mainRoutes.use("/borrow", auth_middleware_1.authMiddleware, borrow_routes_1.default);
exports.mainRoutes.use("/auth", auth_routes_1.default);
exports.default = exports.mainRoutes;
