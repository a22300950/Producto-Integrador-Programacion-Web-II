import express from 'express';

import { crearPedido } from '../controllers/pedidos.controller.js';
import { obtenerPedidos } from '../controllers/pedidos.get.controller.js';

const router = express.Router();


router.post('/', crearPedido);
router.get('/', obtenerPedidos);

export default router;
