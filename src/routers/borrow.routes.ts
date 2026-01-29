import { Router } from "express";
import { borrowController } from "../controllers/borrow.controller";
const borrowRouter = Router();
const BorrowController = new borrowController();

//================== Issue Book ====================
borrowRouter.post("/issueBook/:bookId/:memberId",BorrowController.issueBook);

//================== Return Book ===================
borrowRouter.put("/returnBook/:borrowId", BorrowController.returnBook);

//================== Borrow History ================
borrowRouter.get("/history/:memberId", BorrowController.borrowHistory);

export default borrowRouter;
