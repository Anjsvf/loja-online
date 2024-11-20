"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const slide_routes_1 = __importDefault(require("./routes/slide.routes"));
const path = require("path");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://loja-online-umber.vercel.app/']
}));
server.get('/', (req, res) => {
    res.json({
        message: 'Server is working',
        status: 'OK',
    });
});
server.use('/api', userRoutes_1.default);
server.use('/api/', productRoutes_1.default);
server.use('/uploads', express_1.default.static(path.join(__dirname, '..', 'uploads')));
server.use('/slides', slide_routes_1.default);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em ${process.env.BASE_URL || 'http://localhost:' + PORT}`);
});
