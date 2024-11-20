"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.updateProduct = exports.getAllProducts = void 0;
const prismaClient_1 = require("../prismaClient");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllProducts = async (req, res) => {
    try {
        const products = await prismaClient_1.prisma.product.findMany();
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
exports.getAllProducts = getAllProducts;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, discount } = req.body;
    const imagePath = req.file ? req.file.path : undefined;
    try {
        const updatedProduct = await prismaClient_1.prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                category,
                price: price ? parseFloat(price) : 0, // Valor padrão
                discount: discount ? parseFloat(discount) : null,
                imageUrl: imagePath,
            },
        });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};
exports.updateProduct = updateProduct;
const createProduct = async (req, res) => {
    const { name, category, price, discount, userId } = req.body;
    const imagePath = req.file ? req.file.path : undefined;
    try {
        const product = await prismaClient_1.prisma.product.create({
            data: {
                name,
                category,
                price: price ? parseFloat(price) : 0, // Valor padrão
                discount: discount ? parseFloat(discount) : null,
                imageUrl: imagePath,
                user: userId ? { connect: { id: Number(userId) } } : undefined,
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
};
exports.createProduct = createProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prismaClient_1.prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return; // Garante que o código abaixo não será executado
        }
        await prismaClient_1.prisma.product.delete({
            where: { id: Number(id) },
        });
        const imagePath = product.imageUrl;
        if (imagePath) {
            const fullImagePath = path_1.default.join(__dirname, "..", "..", imagePath);
            if (fs_1.default.existsSync(fullImagePath)) {
                fs_1.default.unlinkSync(fullImagePath);
            }
        }
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
};
exports.deleteProduct = deleteProduct;
