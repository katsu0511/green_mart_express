import { z } from 'zod';
import type { signupSchema } from '@/validations/authValidation.js';

export type SignupInput = z.infer<typeof signupSchema>;
