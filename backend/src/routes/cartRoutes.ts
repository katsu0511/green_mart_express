import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requireRole } from '@/middlewares/requireRole.js';
import { Role } from '@/lib/generated/prisma/client.js';
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from '@/controllers/cartController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { cartAddSchema, cartParamSchema, cartUpdateSchema } from '@/validations/cartValidation.js';

const router = Router();

router.get('/', authMiddleware, requireRole(Role.CUSTOMER), getCartItems);
router.post('/', authMiddleware, requireRole(Role.CUSTOMER), validate(cartAddSchema, 'body'), addCartItem);
router.patch('/:productId', authMiddleware, requireRole(Role.CUSTOMER), validate(cartParamSchema, 'params'), validate(cartUpdateSchema, 'body'), updateCartItem);
router.delete('/:productId', authMiddleware, requireRole(Role.CUSTOMER), validate(cartParamSchema, 'params'), deleteCartItem);

export default router;
