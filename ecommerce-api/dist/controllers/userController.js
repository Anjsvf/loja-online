"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const prismaClient_1 = require("../prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, password, and name are required' });
    }
    try {
        const existingUser = await prismaClient_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prismaClient_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Error during user registration:', error);
        next(error); // Pass the error to the next middleware
    }
};
exports.registerUser = registerUser;
