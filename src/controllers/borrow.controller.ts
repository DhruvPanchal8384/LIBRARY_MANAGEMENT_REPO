import { AppDataSource } from "../datasource";
import { Book } from "../entities/book.entity";
import { Borrow } from "../entities/borrow.entity";
import { Member } from "../entities/member.entity";
import { Request, Response } from "express";

export class borrowController {
  //============================Issue Book==========================================
  async issueBook(req: Request, res: Response) {
    const borrowRepo = AppDataSource.getRepository(Borrow);
    const bookRepo = AppDataSource.getRepository(Book);
    const memberRepo = AppDataSource.getRepository(Member);
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  //========================== Return Book==========================================
  async returnBook(req: Request, res: Response) {
    const borrowRepo = AppDataSource.getRepository(Borrow);
    const bookRepo = AppDataSource.getRepository(Book);
    try {
      const id = Number(req.params.borrowId);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid borrow_id" });
      }
      const borrow = await borrowRepo.findOne({
        where: { borrow_id: Number(req.params.borrowId) },
        relations: ["book"],
      });
      if (!borrow) return res.status(404).json({ message: "Record not found" });

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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  //======================= Borrow History===========================================
  async borrowHistory(req: Request, res: Response) {
    const borrowRepo = AppDataSource.getRepository(Borrow);

    try {
      const history = await borrowRepo.find({
        where: { member: { id: Number(req.params.memberId) } },
        relations: ["book", "member"],
      });
      res.json(history);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
