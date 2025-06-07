import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApplicationError } from '../../core/errors/application-error';
import { NotFoundError } from '../../core/errors/not-found-error';
import { ValidationError } from '../../core/errors/validation-error';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (
    error instanceof ApplicationError ||
    error instanceof NotFoundError ||
    error instanceof ValidationError
  ) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({ error: error.errors });
    return;
  }

  console.error(error);

  res.status(500).json({ error: 'Internal server error' });
};