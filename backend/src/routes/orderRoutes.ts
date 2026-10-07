import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requireRole } from '@/middlewares/requireRole.js';
import { Role } from '@/lib/generated/prisma/client.js';
import { getOrders, getOrder } from '@/controllers/orderController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { orderIdSchema } from '@/validations/orderValidation.js';

const router = Router();

router.get('/', authMiddleware, requireRole(Role.CUSTOMER), getOrders);
router.get('/:id', authMiddleware, requireRole(Role.CUSTOMER), validate(orderIdSchema, 'params'), getOrder);

export default router;
