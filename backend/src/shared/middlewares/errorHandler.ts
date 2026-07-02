import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Erro interno do servidor.'
  const code = err.code || 'INTERNAL_ERROR'

  console.error(`[ERROR] ${req.method} ${req.path}:`, message)

  return res.status(statusCode).json({ error: code, message })
}