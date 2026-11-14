import { Router } from 'express';
import { getCategories, createCategory } from '@/controllers/categoryController.js';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requireRole } from '@/middlewares/requireRole.js';
import { Role } from '@/lib/generated/prisma/browser.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { createCategorySchema } from '@/validations/categoryValidation.js';

const router = Router();

router.get('/', getCategories);
router.post('/', authMiddleware, requireRole(Role.ADMIN), validate(createCategorySchema, 'body'), createCategory);

export default router;
