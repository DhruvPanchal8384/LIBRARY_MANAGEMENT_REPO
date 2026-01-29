import { Router } from "express";
import { bookController } from "../controllers/book.controller";

const bookRoutes = Router();
const BookController = new bookController();

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

export default bookRoutes;
