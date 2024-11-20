import express, { Request, Response } from 'express';
import { getSlides, createSlide, updateSlide, deleteSlide } from '../services/slide.service';

const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  try {
    const slides = await getSlides();
    res.json(slides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar slides' });
  }
});


router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, color, imageUrl } = req.body;
    const newSlide = await createSlide({ message, color, imageUrl });
    res.status(201).json(newSlide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar slide' });
  }
});


router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedSlide = await updateSlide(id, req.body);
    res.json(updatedSlide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar slide' });
  }
});


router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteSlide(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar slide' });
  }
});

export default router;
