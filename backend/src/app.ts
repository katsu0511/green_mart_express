import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '@/routes/authRoutes.js';
import productRoutes from '@/routes/productRoutes.js';
import cartRoutes from '@/routes/cartRoutes.js';
import checkoutRoutes from '@/routes/checkoutRoutes.js';
import orderRoutes from '@/routes/orderRoutes.js';
import errorMiddleware from '@/middlewares/errorMiddleware.js';

const app = express();

app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorMiddleware);

export default app;
