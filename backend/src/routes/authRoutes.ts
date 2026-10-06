import { Router } from 'express';
import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { getMe, login, logout, signup } from '@/controllers/authController.js';
import { validate } from '@/middlewares/validateMiddleware.js';
import { loginSchema, signupSchema } from '@/validations/authValidation.js';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.post('/login', validate(loginSchema, 'body'), login);
router.post('/logout', logout);
router.post('/signup', validate(signupSchema, 'body'), signup);

export default router;
