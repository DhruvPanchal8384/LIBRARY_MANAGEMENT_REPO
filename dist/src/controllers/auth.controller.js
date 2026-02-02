"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const datasource_1 = require("../../datasource");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class authController {
    // =================Register a new user=======================
    async register(req, res) {
        const { name, email, password } = req.body;
        const userRepo = datasource_1.AppDataSource.getRepository(user_entity_1.User);
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, and password are required" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = userRepo.create({
            name,
            email,
            password: hashedPassword,
        });
        await userRepo.save(user);
        res.status(201).json({ message: "User registered successfully" });
    }
    // =================Login an existing user====================
    async login(req, res) {
        const { email, password } = req.body;
        const userRepo = datasource_1.AppDataSource.getRepository(user_entity_1.User);
        const user = await userRepo.findOneBy({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET || "mysecret", { expiresIn: "1d" });
        console.log(token);
        return res.json({ message: "Login success", token });
    }
    // =================Logout====================================
    async logout(req, res) {
        // Invalidate the token on the client side by instructing the client to delete it.
        return res
            .status(200)
            .json({ message: "Logout success. Please remove token from client." });
    }
}
exports.authController = authController;
