
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { NextFunction, Request, Response } from 'express';


const storage = multer.memoryStorage(); 

export const upload = multer({ storage });


export const processImage = async (req:Request, res:Response, next:NextFunction) => {
  if (!req.file) {
    return next(); 
  }

  try {

    const filename = `${Date.now()}-${path.parse(req.file.originalname).name}.webp`; 
    const outputPath = path.join('uploads', filename);
    

    
    await sharp (req.file.buffer)
      .resize(800) 
      .webp({ quality: 80 }) 
      .toFile(outputPath);

   
      req.file.path = `/uploads/${filename}`;  
    next();
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    res.status(500).json({ error: 'Erro ao processar a imagem' });
  }
};
