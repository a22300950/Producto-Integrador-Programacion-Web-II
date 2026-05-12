import express from 'express';
import cors from 'cors';

import productsRoutes from './routes/products.routes.js';
import paypalRoutes from './routes/paypal.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/pedidos', pedidosRoutes);

export default app;