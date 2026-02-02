"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const typeorm_1 = require("typeorm");
const book_entity_1 = require("./book.entity");
const member_entity_1 = require("./member.entity");
//================== Borrow Entity ====================
let Borrow = class Borrow {
};
exports.Borrow = Borrow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Borrow.prototype, "borrow_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book),
    (0, typeorm_1.JoinColumn)({ name: "book_id" }),
    __metadata("design:type", book_entity_1.Book)
], Borrow.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "member_id" }),
    __metadata("design:type", member_entity_1.Member)
], Borrow.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Borrow.prototype, "issue_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Borrow.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Borrow.prototype, "return_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Borrow.prototype, "status", void 0);
exports.Borrow = Borrow = __decorate([
    (0, typeorm_1.Entity)("borrow_table")
], Borrow);
