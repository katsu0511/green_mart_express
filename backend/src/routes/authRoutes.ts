import { Router } from 'express';
import { validate } from '@/middlewares/validateMiddleware.js';
import { signupSchema } from '@/validations/authValidationSchema.js';
import { signup } from '@/controllers/authController.js';

const router = Router();

router.post('/signup', validate(signupSchema, 'body'), signup);

export default router;
