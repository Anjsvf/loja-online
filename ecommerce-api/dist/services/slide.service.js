"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSlide = exports.updateSlide = exports.createSlide = exports.getSlides = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSlides = async () => {
    return prisma.slide.findMany({
        orderBy: { createdAt: 'desc' },
    });
};
exports.getSlides = getSlides;
const createSlide = async (data) => {
    return prisma.slide.create({ data });
};
exports.createSlide = createSlide;
const updateSlide = async (id, data) => {
    return prisma.slide.update({
        where: { id },
        data,
    });
};
exports.updateSlide = updateSlide;
const deleteSlide = async (id) => {
    return prisma.slide.delete({
        where: { id },
    });
};
exports.deleteSlide = deleteSlide;
