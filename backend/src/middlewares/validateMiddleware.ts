import type { ZodType } from 'zod';
import type { RequestHandler } from 'express';

export const validate = <T>(schema: ZodType<T>, target: 'body' | 'params' | 'query'): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    req.params = result.data as typeof req.params;
    next();
  };
};
