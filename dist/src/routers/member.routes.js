"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = require("../controllers/member.controller");
const memberRouter = (0, express_1.Router)();
const MemberController = new member_controller_1.memberController();
//================== getAllMember ====================
memberRouter.get("/getAllMember", MemberController.getAllMembers);
//================== Get Member By ID ================
memberRouter.get("/memberById/:id", MemberController.getMemberById);
//================== Add Member ======================
memberRouter.post("/createMember", MemberController.addMember);
//================== Update Member ===================
memberRouter.put("/updateMember/:id", MemberController.updateMember);
//================== Delete Member ===================
memberRouter.delete("/deleteMember/:id", MemberController.deleteMember);
exports.default = memberRouter;
