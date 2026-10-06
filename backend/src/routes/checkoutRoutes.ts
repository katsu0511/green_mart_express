import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requireRole } from '@/middlewares/requireRole.js';
import { Role } from '@/lib/generated/prisma/client.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { checkoutSchema } from '@/validations/checkoutValidation.js';
import { checkout } from '@/controllers/checkoutController.js';

const router = Router();

router.post('/', authMiddleware, requireRole(Role.CUSTOMER), validate(checkoutSchema, 'body'), checkout);

export default router;
