import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from '@/controllers/cartController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { cartAddSchema, cartUpdateSchema, cartParamSchema } from '@/validations/cartValidation.js';

const router = Router();

router.get('/', authMiddleware, getCartItems);
router.post('/', authMiddleware, validate(cartAddSchema, 'body'), addCartItem);
router.patch('/:productId', authMiddleware, validate(cartParamSchema, 'params'), validate(cartUpdateSchema, 'body'), updateCartItem);
router.delete('/:productId', authMiddleware, validate(cartParamSchema, 'params'), deleteCartItem);

export default router;
