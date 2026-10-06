import type { Role } from '@/lib/generated/prisma/client.js';
import type { RequestHandler } from 'express';
import { findUserRoleById } from '@/repositories/userRepository.js';

export const requireRole = (role: Role): RequestHandler => {
  return async (req, res, next) => {
    const user = await findUserRoleById(req.userId);

    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};
