"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const slide_service_1 = require("../services/slide.service");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const slides = await (0, slide_service_1.getSlides)();
        res.json(slides);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar slides' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { message, color, imageUrl } = req.body;
        const newSlide = await (0, slide_service_1.createSlide)({ message, color, imageUrl });
        res.status(201).json(newSlide);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar slide' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updatedSlide = await (0, slide_service_1.updateSlide)(id, req.body);
        res.json(updatedSlide);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar slide' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await (0, slide_service_1.deleteSlide)(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar slide' });
    }
});
exports.default = router;
