// app.ts
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { apiLimiter, authLimiter } from './shared/middlewares/rateLimiter'
import { errorHandler } from './shared/middlewares/errorHandler'
import { validate } from './shared/middlewares/validate'

import { routerUsuario } from './usuarios/adapters/routes/usuario.routes'
import { UsuarioController } from './usuarios/adapters/controllers/UsuarioController'
import { CadastrarUsuarioUseCase } from './usuarios/use-cases/CadastrarUsuarioUseCase'
import { SupabaseUsuarioRepository } from './usuarios/infrastructure/repositories/SupabaseUsuarioRepository'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(apiLimiter)

// Composição das dependências do módulo usuarios (única vez, aqui)
const usuarioRepository = new SupabaseUsuarioRepository()
const cadastrarUsuarioUseCase = new CadastrarUsuarioUseCase(usuarioRepository)
const usuarioController = new UsuarioController(cadastrarUsuarioUseCase)

// Rotas
app.use('/auth', authLimiter, routerUsuario(usuarioController))
// app.use('/barbershops', routerBarbershop(controllerBarbershop)) // Módulo 2

app.use(errorHandler)

export default app