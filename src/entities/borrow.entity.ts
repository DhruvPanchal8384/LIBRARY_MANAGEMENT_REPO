import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./book.entity";
import { Member } from "./member.entity";

//================== Borrow Entity ====================
@Entity("borrow_table")
export class Borrow {
  @PrimaryGeneratedColumn()
  borrow_id!: number;

  @ManyToOne(() => Book, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  issue_date!: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  due_date!: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  return_date!: Date | null;

  @Column({ type: "varchar", nullable: true })
  status!: string;
}
