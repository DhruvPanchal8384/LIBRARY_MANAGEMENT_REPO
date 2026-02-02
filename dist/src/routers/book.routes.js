"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const bookRoutes = (0, express_1.Router)();
const BookController = new book_controller_1.bookController();
//================== getAllBook ====================
bookRoutes.get("/getAllBooks", BookController.getAllbooks);
//================== Get Book By ID =================
bookRoutes.get("/getBook/:id", BookController.getBookById);
//================== Add, Update, Delete Book =======
bookRoutes.post("/addBook", BookController.addBooks);
//================== Update Book ====================
bookRoutes.put("/updateBook/:id", BookController.updateBook);
//================== Delete Book ====================
bookRoutes.delete("/deleteBook/:id", BookController.deleteBook);
exports.default = bookRoutes;
