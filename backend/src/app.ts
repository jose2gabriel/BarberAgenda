import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { apiLimiter } from './shared/middlewares/rateLimiter'
import { errorHandler } from './shared/middlewares/errorHandler'

// import { routerAuth } from './modules/auth/routes/auth.routes'
// import { controllerAuth } from './modules/auth'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// Rate limit geral da API
app.use(apiLimiter)

// Rotas
// app.use('/auth', routerAuth(controllerAuth))
// app.use('/barbershops', routerBarbershop(controllerBarbershop))

app.use(errorHandler)

export default app