import type { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error.message === 'Product not found') {
    return res.status(404).json({ error: error.message });
  }

  res.status(500).json({ error: error.message });
};

export default errorMiddleware;
