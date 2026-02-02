"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("../controllers/borrow.controller");
const borrowRouter = (0, express_1.Router)();
const BorrowController = new borrow_controller_1.borrowController();
//================== Issue Book ====================
borrowRouter.post("/issueBook/:bookId/:memberId", BorrowController.issueBook);
//================== Return Book ===================
borrowRouter.put("/returnBook/:borrowId", BorrowController.returnBook);
//================== Borrow History ================
borrowRouter.get("/history/:memberId", BorrowController.borrowHistory);
exports.default = borrowRouter;
