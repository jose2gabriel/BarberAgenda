import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { apiLimiter, authLimiter } from './shared/middlewares/rateLimiter'
import { errorHandler } from './shared/middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(apiLimiter)
app.use('/auth/login', authLimiter)
app.use('/auth/recover-password', authLimiter)

// rotas vão entrar aqui depois
// app.use('/auth', routerAuth(controller_auth))
// app.use('/barbershops', routerBarbershop(controller_barbershop))
app.use(errorHandler) 

export default app