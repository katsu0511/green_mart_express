import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { getOrders, getOrder } from '@/controllers/orderController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { orderIdSchema } from '@/validations/orderValidation.js';

const router = Router();

router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, validate(orderIdSchema, 'params'), getOrder);

export default router;
