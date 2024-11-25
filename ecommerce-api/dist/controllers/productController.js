"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProducts = void 0;
const prismaClient_1 = require("../prismaClient");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Função para buscar todos os produtos com suporte à paginação
const getAllProducts = async (req, res) => {
    const { page = 1, limit = 1000 } = req.query; // Default: 10 produtos por página
    try {
        const products = await prismaClient_1.prisma.product.findMany({
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
        });
        const total = await prismaClient_1.prisma.product.count(); // Contagem total de produtos
        res.status(200).json({ products, total, page: Number(page), limit: Number(limit) });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
exports.getAllProducts = getAllProducts;
// Função para criar um novo produto
const createProduct = async (req, res) => {
    const { name, category, price, discount, userId } = req.body;
    const imagePath = req.file ? req.file.path : undefined;
    try {
        // Verificar se o usuário existe
        if (userId) {
            const userExists = await prismaClient_1.prisma.user.findUnique({ where: { id: Number(userId) } });
            if (!userExists) {
                res.status(404).json({ error: "User not found" });
                return;
            }
        }
        const product = await prismaClient_1.prisma.product.create({
            data: {
                name,
                category,
                price: price ? parseFloat(price) : 0,
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
// Função para atualizar um produto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, discount } = req.body;
    const imagePath = req.file ? req.file.path : undefined;
    try {
        const existingProduct = await prismaClient_1.prisma.product.findUnique({ where: { id: Number(id) } });
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        // Remover a imagem antiga, se uma nova foi enviada
        if (imagePath && existingProduct.imageUrl) {
            const fullImagePath = path_1.default.resolve(existingProduct.imageUrl);
            if (fs_1.default.existsSync(fullImagePath)) {
                fs_1.default.unlinkSync(fullImagePath);
            }
        }
        const updatedProduct = await prismaClient_1.prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                category,
                price: price ? parseFloat(price) : 0,
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
// Função para deletar um produto
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prismaClient_1.prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        await prismaClient_1.prisma.product.delete({
            where: { id: Number(id) },
        });
        const imagePath = product.imageUrl;
        if (imagePath) {
            const fullImagePath = path_1.default.resolve(imagePath); // Caminho absoluto
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
