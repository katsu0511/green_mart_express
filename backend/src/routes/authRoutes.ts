import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { getMe, signup } from '@/controllers/authController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { signupSchema } from '@/validations/authValidationSchema.js';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.post('/signup', validate(signupSchema, 'body'), signup);

export default router;
