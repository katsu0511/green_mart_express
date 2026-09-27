import type { Request, Response } from 'express';
import type { AppUser } from '@/types/user.js';
import * as authService from '@/services/authService.js';

export const getMe = async (req: Request, res: Response) => {
  const user: AppUser = await authService.getMe(req.userId);
  res.status(200).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  setAuthCookie(res, token);
  res.status(200).json(user);
};

export const logout = async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.status(204).send();
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.signup(name, email, password);
  setAuthCookie(res, token);
  res.status(201).json(user);
};

const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  });
};

const clearAuthCookie = (res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};
