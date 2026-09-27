import type { ErrorRequestHandler } from 'express';
import { AppError } from '@/lib/appError.js';

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  res.status(500).json({ error: error.message });
};

export default errorMiddleware;
