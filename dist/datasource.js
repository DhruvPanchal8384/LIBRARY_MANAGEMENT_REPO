"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const book_entity_1 = require("./src/entities/book.entity");
const member_entity_1 = require("./src/entities/member.entity");
const borrow_entity_1 = require("./src/entities/borrow.entity");
const user_entity_1 = require("./src/entities/user.entity");
//================== Database Configuration ====================
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT || 3306),
    entities: [book_entity_1.Book, member_entity_1.Member, borrow_entity_1.Borrow, user_entity_1.User],
    synchronize: true,
    logging: false,
});
