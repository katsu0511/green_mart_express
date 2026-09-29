import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { getCartItems } from '@/controllers/cartController.js';

const router = Router();

router.get('/', authMiddleware, getCartItems);

export default router;
