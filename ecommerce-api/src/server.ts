import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes'
import productRouter from './routes/productRoutes';
import slideRoutes from './routes/slide.routes';

import path = require('path');
import cors from  "cors"

dotenv.config();

const prisma = new PrismaClient();
const server = express();
server.use(express.json());

server.use(cors({
  origin: ['http://localhost:3000', 'https://loja-online-umber.vercel.app/']
}));
server.get('/', (req, res) => {
    res.json({
      message: 'Server is working',
      status: 'OK',
    });
  });
  server.use('/api', userRouter);
  server.use('/api/', productRouter);
  server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
server.use('/slides', slideRoutes);
  
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em ${process.env.BASE_URL || 'http://localhost:' + PORT}`);
});
