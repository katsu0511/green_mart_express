import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { getOrders } from '@/controllers/orderController.js';

const router = Router();

router.get('/', authMiddleware, getOrders);

export default router;
