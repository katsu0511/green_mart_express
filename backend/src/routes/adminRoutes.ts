import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requireRole } from '@/middlewares/requireRole.js';
import { Role } from '@/lib/generated/prisma/client.js';
import { getDashboard } from '@/controllers/adminController.js';

const router = Router();

router.get('/', authMiddleware, requireRole(Role.ADMIN), getDashboard);

export default router;
