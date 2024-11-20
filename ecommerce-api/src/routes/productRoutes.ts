import express from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct } from '../controllers/productController';
import { upload, processImage } from '../middleware/upload';

const router = express.Router();

router.post('/products', upload.single('image'), processImage, createProduct); 
router.get('/products', getAllProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;