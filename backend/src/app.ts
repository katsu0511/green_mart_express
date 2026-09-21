import express from 'express';
import cors from 'cors';
import productRoutes from '@/routes/productRoutes.js';
import errorMiddleware from '@/middlewares/errorMiddleware.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/products', productRoutes);

app.use(errorMiddleware);

export default app;
