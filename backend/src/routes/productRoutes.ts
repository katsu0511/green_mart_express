import { Router } from 'express';
import { getProducts, getProduct } from '@/controllers/productController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { productIdSchema } from '@/validations/productValidation.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', validate(productIdSchema), getProduct);

export default router;
