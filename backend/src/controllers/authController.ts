import type { Request, Response } from 'express';
import * as authService from '@/services/authService.js';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.signup(name, email, password);
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    })
    .status(201)
    .json(user);
};
