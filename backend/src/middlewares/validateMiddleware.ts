import type { ZodType } from 'zod';
import type { RequestHandler } from 'express';

export const validate = <T>(schema: ZodType<T>): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    req.params = result.data as typeof req.params;
    next();
  };
};
