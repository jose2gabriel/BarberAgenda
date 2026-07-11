import jwt from 'jsonwebtoken'

export type Role = 'cliente' | 'profissional' | 'owner'

export interface IJwtPayload {
  id: string
  email: string
  role: Role
  roles: Role[]
}

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'

export function assinarToken(payload: IJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any })
}

export function verificarToken(token: string): IJwtPayload {
  return jwt.verify(token, JWT_SECRET) as IJwtPayload
}