import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .refine((date) => {
      const parsedDate = new Date(`${date}T00:00:00.000Z`);
      return !isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === date;
    }, 'Invalid date')
    .refine(
      (date) => date <= new Date().toISOString().slice(0, 10),
      'Birth date cannot be in the future',
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});
