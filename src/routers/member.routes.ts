import { Router } from "express";
import { memberController } from "../controllers/member.controller";
const memberRouter = Router();
const MemberController = new memberController();

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


export default memberRouter;

