import { AppDataSource } from "../../datasource";
import { Request, Response } from "express";
import { Member } from "../entities/member.entity";
import { Borrow } from "../entities/borrow.entity";

export class memberController {
  //================= GetMembers ==================
  async getAllMembers(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Member);
      const members = await repo.find();
      return res.json(members);
    } catch (err) {
      console.error("getMembers error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  //=================== GetMemberById =============
  async getMemberById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id))
        return res.status(400).json({ message: "Invalid id" });
      const repo = AppDataSource.getRepository(Member);
      const memberId = await repo.findOneBy({ id });
      if (!memberId) {
        return res.status(404).json({ message: "Member not found" });
      }
      return res.json(memberId);
    } catch (err) {
      console.error("getMemberById error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  //=================== AddMember =================
  async addMember(req: Request, res: Response) {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const repo = AppDataSource.getRepository(Member);
      const newMember = repo.create({
        name,
        email,
        phone,
      });
      const savedMember = await repo.save(newMember);
      return res.status(201).json(savedMember);
    } catch (err) {
      console.error("addMember error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  //================= UpdateMember ================
  async updateMember(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id))
        return res.status(400).json({ message: "Invalid id" });
      const { name, email, phone } = req.body;
      const repo = AppDataSource.getRepository(Member);
      const existing = await repo.findOne({ where: { id } });
      if (!existing)
        return res.status(404).json({ message: "Member not found" });
      if (name !== undefined) existing.name = name;
      if (email !== undefined) existing.email = email;
      if (phone !== undefined) existing.phone = phone;
      const updatedMember = await repo.save(existing);
      return res.json(updatedMember);
    } catch (err) {
      console.error("updateMember error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  //=================== DeleteMember ==============
  async deleteMember(req: Request, res: Response) {
    const id = Number(req.params.id);
    const repo = AppDataSource.getRepository(Member);
    const borrowRepo = AppDataSource.getRepository(Borrow);

    //   if (Number.isNaN(id))
    //     return res.status(400).json({ message: "Invalid id" });
    //   const existing = await repo.findOne({ where: { id } });
    //   if (!existing)
    //     return res.status(404).json({ message: "Member not found" });
    //   await repo.remove(existing);
    //   return res.json({ message: "Member deleted successfully" });
    // } catch (err) {
    //   console.error("deleteMember error:", err);
    //   return res.status(500).json({ message: "Server error" });
    const member = await repo.findOneBy({ id });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // 2. Check active (not returned) books
    const activeBorrows = await borrowRepo.count({
      where: {
        member: { id: member.id },
        status: "ISSUED", // not returned
      },
    });

    // 3. Safe to delete
   
if (activeBorrows > 0) {
      return res.status(400).json({
        message:
          "Member cannot be deleted. Please return all borrowed books first.",
      });
    }
     await repo.delete(member.id);
    return res.json({ message: "Member deleted successfully" });

    
  }
}
