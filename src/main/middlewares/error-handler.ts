import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err)

  const status = err.statusCode || 500
  const message = err.message || 'Internal server error'

  res.status(status).json({
    message,
    error: process.env.NODE_ENV === 'DEVELOPMENT' ? err : undefined
  })
}