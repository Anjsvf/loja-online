import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSlides = async () => {
  return prisma.slide.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const createSlide = async (data: { message: string; color: string; imageUrl: string }) => {
  return prisma.slide.create({ data });
};

export const updateSlide = async (id: number, data: Partial<{ message: string; color: string; imageUrl: string }>) => {
  return prisma.slide.update({
    where: { id },
    data,
  });
};

export const deleteSlide = async (id: number) => {
  return prisma.slide.delete({
    where: { id },
  });
};
