import express from 'express';
import { getProductos } from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', getProductos);

export default router;