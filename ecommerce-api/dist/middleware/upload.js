"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
const processImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    try {
        const filename = `${Date.now()}-${path_1.default.parse(req.file.originalname).name}.webp`;
        const outputPath = path_1.default.join('uploads', filename);
        await (0, sharp_1.default)(req.file.buffer)
            .resize(800)
            .webp({ quality: 80 })
            .toFile(outputPath);
        req.file.path = `/uploads/${filename}`;
        next();
    }
    catch (error) {
        console.error('Erro ao processar imagem:', error);
        res.status(500).json({ error: 'Erro ao processar a imagem' });
    }
};
exports.processImage = processImage;
