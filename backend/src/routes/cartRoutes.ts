import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { getCartItems, addCartItem } from '@/controllers/cartController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { cartSchema } from '@/validations/cartValidation.js';

const router = Router();

router.get('/', authMiddleware, getCartItems);
router.post('/', authMiddleware, validate(cartSchema, 'body'), addCartItem);

export default router;
