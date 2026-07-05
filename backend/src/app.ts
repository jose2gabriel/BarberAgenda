import express, { Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { apiLimiter, authLimiter } from './shared/middlewares/rateLimiter'
import { errorHandler } from './shared/middlewares/errorHandler'
import { routerAuth, routerUsers } from './usuarios/adapters/routes/usuario.routes'
import { UsuarioController } from './usuarios/adapters/controllers/UsuarioController'
import { CadastrarUsuarioUseCase } from './usuarios/use-cases/CadastrarUsuarioUseCase'
import { SupabaseUsuarioRepository } from './usuarios/infrastructure/repositories/SupabaseUsuarioRepository'
import { AutenticarUsuarioUseCase } from './usuarios/use-cases/AutenticarUsuarioUseCase'
import { BuscarUsuarioUseCase } from './usuarios/use-cases/BuscarUsuarioUseCase'
import { EncerrarSessaoUseCase } from './usuarios/use-cases/EncerrarSessaoUseCase'
import { AtualizarUsuarioUseCase } from './usuarios/use-cases/AtualizarUsuarioUseCase'
import { SolicitarRecuperacaoSenhaUseCase } from './usuarios/use-cases/SolicitarRecuperacaoSenhaUseCase'
import { RedefinirSenhaUseCase } from './usuarios/use-cases/RedefinirSenhaUseCase'
import { SupabasePasswordResetTokenRepository } from './usuarios/infrastructure/repositories/SupabasePasswordResetTokenRepository'
import { NodemailerEmailService } from './shared/infrastructure/NodemailerEmailService'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(apiLimiter)

// Composição das dependências do módulo usuarios (única vez, aqui)
const usuarioRepository = new SupabaseUsuarioRepository()
const cadastrarUsuarioUseCase = new CadastrarUsuarioUseCase(usuarioRepository)
const autenticarUsuarioUseCase = new AutenticarUsuarioUseCase(usuarioRepository)
const buscarUsuarioUseCase = new BuscarUsuarioUseCase(usuarioRepository)
const encerrarSessaoUseCase = new EncerrarSessaoUseCase()
const atualizarUsuarioUseCase = new AtualizarUsuarioUseCase(usuarioRepository)

// RF030 — Recuperação de senha
const passwordResetTokenRepository = new SupabasePasswordResetTokenRepository()
const emailService = new NodemailerEmailService()
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
const solicitarRecuperacaoSenhaUseCase = new SolicitarRecuperacaoSenhaUseCase(
  usuarioRepository,
  passwordResetTokenRepository,
  emailService,
  frontendUrl
)
const redefinirSenhaUseCase = new RedefinirSenhaUseCase(usuarioRepository, passwordResetTokenRepository)

const usuarioController = new UsuarioController(
  cadastrarUsuarioUseCase,
  autenticarUsuarioUseCase,
  buscarUsuarioUseCase,
  encerrarSessaoUseCase,
  atualizarUsuarioUseCase,
  solicitarRecuperacaoSenhaUseCase,
  redefinirSenhaUseCase
)

// Rotas — versionadas sob /api/v1 (endpoints.md)
const apiV1 = Router()
apiV1.use('/auth', authLimiter, routerAuth(usuarioController))
apiV1.use('/users', routerUsers(usuarioController))
// apiV1.use('/barbershops', routerBarbershop(controllerBarbershop)) // Módulo 2

app.use('/api/v1', apiV1)

app.use(errorHandler)

export default app
