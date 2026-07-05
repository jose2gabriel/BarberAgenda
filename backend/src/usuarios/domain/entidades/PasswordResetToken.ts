export interface PasswordResetToken {
  id: string
  userId: string
  token: string // guarda o hash sha256 do token enviado por e-mail, nunca o token cru
  expiresAt: string
  used: boolean
}
