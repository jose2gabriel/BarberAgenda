import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: 'TOO_MANY_REQUESTS',
    message: 'Muitas tentativas. Tente novamente em 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    error: 'TOO_MANY_REQUESTS',
    message: 'Limite de requisições atingido.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})