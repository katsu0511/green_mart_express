import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  userId: number
};

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
