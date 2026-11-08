import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requireRole } from '@/middlewares/requireRole.js';
import { Role } from '@/lib/generated/prisma/client.js';
import { getDashboard, addStock, createProduct, updateProduct, deleteProduct } from '@/controllers/adminController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { adminProductIdSchema, stockUpdateSchema, createProductSchema, updateProductSchema } from '@/validations/adminValidation.js';

const router = Router();

router.get('/', authMiddleware, requireRole(Role.ADMIN), getDashboard);
router.patch('/products/:id/stock', authMiddleware, requireRole(Role.ADMIN), validate(adminProductIdSchema, 'params'), validate(stockUpdateSchema, 'body'), addStock);
router.post('/products', authMiddleware, requireRole(Role.ADMIN), validate(createProductSchema, 'body'), createProduct);
router.put('/products/:id/edit', authMiddleware, requireRole(Role.ADMIN), validate(adminProductIdSchema, 'params'), validate(updateProductSchema, 'body'), updateProduct);
router.delete('/products/:id', authMiddleware, requireRole(Role.ADMIN), validate(adminProductIdSchema, 'params'), deleteProduct);

export default router;
