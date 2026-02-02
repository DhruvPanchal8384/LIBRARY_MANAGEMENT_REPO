import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import { Book } from "./src/entities/book.entity";
import { Member } from "./src/entities/member.entity";
import { Borrow } from "./src/entities/borrow.entity";
import { User } from "./src/entities/user.entity";

//================== Database Configuration ====================
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT || 3306),

  entities: [Book, Member, Borrow, User],

  synchronize: true, // ⚠️ use migrations in production
  logging: false,
});
