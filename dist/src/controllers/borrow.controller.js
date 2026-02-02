"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const datasource_1 = require("../../datasource");
const book_entity_1 = require("../entities/book.entity");
const borrow_entity_1 = require("../entities/borrow.entity");
const member_entity_1 = require("../entities/member.entity");
class borrowController {
    //============================Issue Book==========================================
    async issueBook(req, res) {
        const borrowRepo = datasource_1.AppDataSource.getRepository(borrow_entity_1.Borrow);
        const bookRepo = datasource_1.AppDataSource.getRepository(book_entity_1.Book);
        const memberRepo = datasource_1.AppDataSource.getRepository(member_entity_1.Member);
        try {
            const { bookId, memberId } = req.params;
            const book = await bookRepo.findOne({
                where: { id: Number(bookId) },
            });
            const member = await memberRepo.findOneBy({ id: Number(memberId) });
            if (!book || !member) {
                return res.status(404).json({ message: "Book or Member not found" });
            }
            if (book.available <= 0) {
                return res.status(400).json({ message: "Book not available" });
            }
            const issueDate = new Date();
            const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const borrow = borrowRepo.create({
                book,
                member,
                issue_date: issueDate,
                due_date: dueDate,
                status: "ISSUED",
                return_date: null,
            });
            book.available -= 1;
            await bookRepo.save(book);
            await borrowRepo.save(borrow);
            return res.status(201).json(borrow);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    }
    //========================== Return Book==========================================
    async returnBook(req, res) {
        const borrowRepo = datasource_1.AppDataSource.getRepository(borrow_entity_1.Borrow);
        const bookRepo = datasource_1.AppDataSource.getRepository(book_entity_1.Book);
        try {
            const id = Number(req.params.borrowId);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid borrow_id" });
            }
            const borrow = await borrowRepo.findOne({
                where: { borrow_id: Number(req.params.borrowId) },
                relations: ["book"],
            });
            if (!borrow)
                return res.status(404).json({ message: "Record not found" });
            borrow.return_date = new Date();
            borrow.status =
                borrow.return_date > borrow.due_date ? "LATE" : "RETURNED";
            if (borrow.book.quantity <= borrow.book.available) {
                return res.status(400).json({
                    message: "sorry , book can't be added",
                });
            }
            borrow.book.available += 1;
            await bookRepo.save(borrow.book);
            await borrowRepo.save(borrow);
            res.json(borrow);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    }
    //======================= Borrow History===========================================
    async borrowHistory(req, res) {
        const borrowRepo = datasource_1.AppDataSource.getRepository(borrow_entity_1.Borrow);
        try {
            const history = await borrowRepo.find({
                where: { member: { id: Number(req.params.memberId) } },
                relations: ["book", "member"],
            });
            res.json(history);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server Error" });
        }
    }
}
exports.borrowController = borrowController;
