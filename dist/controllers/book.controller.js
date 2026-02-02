"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_entity_1 = require("../entities/book.entity");
const datasource_1 = require("../../datasource");
class bookController {
    //====================== GetBooks=============================
    async getAllbooks(req, res) {
        try {
            const repo = datasource_1.AppDataSource.getRepository(book_entity_1.Book);
            const books = await repo.find();
            // console.log(books);
            return res.json(books);
        }
        catch (err) {
            console.error("getBooks error:", err);
            return res.status(500).json({ message: "Server error" });
        }
    }
    //===================== GetBookById=============================
    async getBookById(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                return res.status(400).json({ message: "Invalid id" });
            const repo = datasource_1.AppDataSource.getRepository(book_entity_1.Book);
            const bookId = await repo.findOne({ where: { id } });
            if (!bookId) {
                return res.status(404).json({ message: "Books not found" });
            }
            return res.json(bookId);
        }
        catch (err) {
            console.error("getBookById error:", err);
            return res.status(500).json({ message: "Server error" });
        }
    }
    //========================= AddBook=============================
    async addBooks(req, res) {
        try {
            const { title, author, isbn, quantity } = req.body;
            if (!title || !author || !isbn || !quantity) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const repo = datasource_1.AppDataSource.getRepository(book_entity_1.Book);
            const newBook = repo.create({
                title,
                author,
                isbn,
                quantity,
                available: quantity,
            });
            const savedBook = await repo.save(newBook);
            return res.status(201).json(savedBook);
        }
        catch (err) {
            console.error("addBook error:", err);
            return res.status(500).json({ message: "Server error" });
        }
    }
    //====================== UpdateBook=============================
    async updateBook(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                return res.status(400).json({ message: "Invalid id" });
            const { title, author, isbn, quantity } = req.body;
            const repo = datasource_1.AppDataSource.getRepository(book_entity_1.Book);
            const existing = await repo.findOne({ where: { id } });
            if (!existing)
                return res.status(404).json({ message: "Book not found" });
            if (title !== undefined)
                existing.title = title;
            if (author !== undefined)
                existing.author = author;
            if (isbn !== undefined)
                existing.isbn = isbn;
            if (quantity !== undefined)
                existing.quantity = quantity;
            const updatedBook = await repo.save(existing);
            return res.json(updatedBook);
        }
        catch (err) {
            console.error("updateBook error:", err);
            return res.status(500).json({ message: "Server error" });
        }
    }
    ///===================== DeleteBook=============================
    async deleteBook(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                return res.status(400).json({ message: "Invalid id" });
            const repo = datasource_1.AppDataSource.getRepository(book_entity_1.Book);
            const existing = await repo.findOne({ where: { id } });
            if (!existing)
                return res.status(404).json({ message: "Book not found" });
            await repo.remove(existing);
            return res.json({ message: "Book deleted successfully" });
        }
        catch (err) {
            console.error("deleteBook error:", err);
            return res.status(500).json({ message: "Server error" });
        }
    }
}
exports.bookController = bookController;
