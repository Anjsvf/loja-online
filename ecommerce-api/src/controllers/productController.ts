import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import path from "path";
import fs from "fs";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, price, discount } = req.body;
  const imagePath = req.file ? req.file.path : undefined;

  try {
    const updatedProduct = await prisma.product.update({
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
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, category, price, discount, userId } = req.body;
  const imagePath = req.file ? req.file.path : undefined;

  try {
    const product = await prisma.product.create({
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
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return; // Garante que o código abaixo não será executado
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    const imagePath = product.imageUrl;
    if (imagePath) {
      const fullImagePath = path.join(__dirname, "..", "..", imagePath);
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
