"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
router.post('/products', upload_1.upload.single('image'), upload_1.processImage, productController_1.createProduct);
router.get('/products', productController_1.getAllProducts);
router.put('/products/:id', productController_1.updateProduct);
router.delete('/products/:id', productController_1.deleteProduct);
exports.default = router;
