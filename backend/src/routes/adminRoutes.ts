import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requireRole } from '@/middlewares/requireRole.js';
import { Role } from '@/lib/generated/prisma/client.js';
import { getDashboard, addStock, createProduct } from '@/controllers/adminController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { adminUpdateSchema, stockUpdateSchema, createProductSchema } from '@/validations/adminValidation.js';

const router = Router();

router.get('/', authMiddleware, requireRole(Role.ADMIN), getDashboard);
router.patch('/products/:id/stock', authMiddleware, requireRole(Role.ADMIN), validate(adminUpdateSchema, 'params'), validate(stockUpdateSchema, 'body'), addStock);
router.post('/products', authMiddleware, requireRole(Role.ADMIN), validate(createProductSchema, 'body'), createProduct);

export default router;
