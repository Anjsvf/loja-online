import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import path from "path";
import fs from "fs";

// Função para buscar todos os produtos com suporte à paginação
export const getAllProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query; // Default: 10 produtos por página
  try {
    const products = await prisma.product.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    const total = await prisma.product.count(); // Contagem total de produtos

    res.status(200).json({ products, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Função para criar um novo produto
export const createProduct = async (req: Request, res: Response) => {
  const { name, category, price, discount, userId } = req.body;
  const imagePath = req.file ? req.file.path : undefined;

  try {
    // Verificar se o usuário existe
    if (userId) {
      const userExists = await prisma.user.findUnique({ where: { id: Number(userId) } });
      if (!userExists) {
        res.status(404).json({ error: "User not found" });
        return;
      }
    }

    const product = await prisma.product.create({
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
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Função para atualizar um produto
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, price, discount } = req.body;
  const imagePath = req.file ? req.file.path : undefined;

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id: Number(id) } });

    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Remover a imagem antiga, se uma nova foi enviada
    if (imagePath && existingProduct.imageUrl) {
      const fullImagePath = path.resolve(existingProduct.imageUrl);
      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath);
      }
    }

    const updatedProduct = await prisma.product.update({
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
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Função para deletar um produto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    const imagePath = product.imageUrl;
    if (imagePath) {
      const fullImagePath = path.resolve(imagePath); // Caminho absoluto
      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath);
      }
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
