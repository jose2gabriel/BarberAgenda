// shared/middlewares/autenticar.ts
import { Request, Response, NextFunction } from 'express'
import { verificarToken, IJwtPayload } from '../utils/jwt'
import { AppError } from '../errors/AppError'

declare global {
  namespace Express {
    interface Request {
      usuario?: IJwtPayload
    }
  }
}

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Token de autenticação não informado.', 401, 'UNAUTHORIZED'))
  }

  const token = authHeader.replace('Bearer ', '').trim()

  try {
    req.usuario = verificarToken(token)
    next()
  } catch {
    next(new AppError('Token inválido ou expirado.', 401, 'INVALID_TOKEN'))
  }
}

/**
 * RF017 — Autorização por perfil.
 * Uso: router.post('/', autenticar, autorizar('owner'), controller.criar)
 */
export function autorizar(...perfisPermitidos: import('../utils/jwt').Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return next(new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED'))
    }

    if (!perfisPermitidos.includes(req.usuario.role)) {
      return next(new AppError('Você não tem permissão para acessar este recurso.', 403, 'FORBIDDEN'))
    }

    next()
  }
}