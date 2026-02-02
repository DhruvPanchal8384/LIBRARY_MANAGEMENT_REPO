import { AppDataSource } from "../datasource";
import { User } from "../entities/user.entity";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class authController {
  // =================Register a new user=======================

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepo.save(user);

    res.status(201).json({ message: "User registered successfully" });
  }

  // =================Login an existing user====================
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    // console.log("tirth");

    const userRepo = AppDataSource.getRepository(User);
    console.log(userRepo);

    const user = await userRepo.findOneBy({ email });
    console.log("tirth");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1d" },
    );
    console.log(token);

    return res.json({ message: "Login success", token });
  }

  // =================Logout====================================
  async logout(req: Request, res: Response) {
    // Invalidate the token on the client side by instructing the client to delete it.
    return res
      .status(200)
      .json({ message: "Logout success. Please remove token from client." });
  }
}
