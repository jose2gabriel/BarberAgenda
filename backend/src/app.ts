import express, { Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { apiLimiter, authLimiter } from './shared/middlewares/rateLimiter'
import { errorHandler } from './shared/middlewares/errorHandler'
import { routerAuth, routerUsers } from './usuarios/adapters/routes/usuario.routes'
import { routerBarbershop } from './barbershops/adapters/routes/barbershop.routes'
import { routerProfissional } from './professionals/adapters/routes/professional.routes'
import { UsuarioController } from './usuarios/adapters/controllers/UsuarioController'
import { BarbeariaController } from './barbershops/adapters/controllers/BarbeariaController'
import { ProfissionalController } from './professionals/adapters/controllers/ProfissionalController'
import { CadastrarUsuarioUseCase } from './usuarios/use-cases/CadastrarUsuarioUseCase'
import { SupabaseUsuarioRepository } from './usuarios/infrastructure/repositories/SupabaseUsuarioRepository'
import { AutenticarUsuarioUseCase } from './usuarios/use-cases/AutenticarUsuarioUseCase'
import { BuscarUsuarioUseCase } from './usuarios/use-cases/BuscarUsuarioUseCase'
import { EncerrarSessaoUseCase } from './usuarios/use-cases/EncerrarSessaoUseCase'
import { AtualizarUsuarioUseCase } from './usuarios/use-cases/AtualizarUsuarioUseCase'
import { SolicitarRecuperacaoSenhaUseCase } from './usuarios/use-cases/SolicitarRecuperacaoSenhaUseCase'
import { RedefinirSenhaUseCase } from './usuarios/use-cases/RedefinirSenhaUseCase'
import { ExcluirContaUseCase } from './usuarios/use-cases/ExcluirContaUseCase'
import { SupabasePasswordResetTokenRepository } from './usuarios/infrastructure/repositories/SupabasePasswordResetTokenRepository'
import { NodemailerEmailService } from './shared/infrastructure/NodemailerEmailService'
import { SupabaseBarbeariaRepository } from './barbershops/infrastructure/repositories/SupabaseBarbeariaRepository'
import { CriarBarbeariaUseCase } from './barbershops/use-cases/CriarBarbeariaUseCase'
import { ListarBarbeariasUseCase } from './barbershops/use-cases/ListarBarbeariasUseCase'
import { BuscarBarbeariaPorIdUseCase } from './barbershops/use-cases/BuscarBarbeariaPorIdUseCase'
import { AtualizarBarbeariaUseCase } from './barbershops/use-cases/AtualizarBarbeariaUseCase'
import { SupabaseProfissionalRepository } from './professionals/infrastructure/repositories/SupabaseProfissionalRepository'
import { CadastrarProfissionalUseCase } from './professionals/use-cases/CadastrarProfissionalUseCase'
import { ListarProfissionaisUseCase } from './professionals/use-cases/ListarProfissionaisUseCase'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(apiLimiter)

// Composição das dependências
const usuarioRepository = new SupabaseUsuarioRepository()
const cadastrarUsuarioUseCase = new CadastrarUsuarioUseCase(usuarioRepository)
const autenticarUsuarioUseCase = new AutenticarUsuarioUseCase(usuarioRepository)
const buscarUsuarioUseCase = new BuscarUsuarioUseCase(usuarioRepository)
const encerrarSessaoUseCase = new EncerrarSessaoUseCase()
const atualizarUsuarioUseCase = new AtualizarUsuarioUseCase(usuarioRepository)
const excluirContaUseCase = new ExcluirContaUseCase(usuarioRepository)

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
  redefinirSenhaUseCase,
  excluirContaUseCase
)

const barbeariaRepository = new SupabaseBarbeariaRepository()
const criarBarbeariaUseCase = new CriarBarbeariaUseCase(barbeariaRepository, usuarioRepository)
const listarBarbeariasUseCase = new ListarBarbeariasUseCase(barbeariaRepository)
const buscarBarbeariaPorIdUseCase = new BuscarBarbeariaPorIdUseCase(barbeariaRepository)
const atualizarBarbeariaUseCase = new AtualizarBarbeariaUseCase(barbeariaRepository)
const barbeariaController = new BarbeariaController(
  criarBarbeariaUseCase,
  listarBarbeariasUseCase,
  buscarBarbeariaPorIdUseCase,
  atualizarBarbeariaUseCase
)

const profissionalRepository = new SupabaseProfissionalRepository()
const cadastrarProfissionalUseCase = new CadastrarProfissionalUseCase(
  profissionalRepository,
  usuarioRepository,
  barbeariaRepository
)
const listarProfissionaisUseCase = new ListarProfissionaisUseCase(profissionalRepository, barbeariaRepository)
const profissionalController = new ProfissionalController(cadastrarProfissionalUseCase, listarProfissionaisUseCase)

// Rotas — versionadas sob /api/v1 (endpoints.md)
const apiV1 = Router()
apiV1.use('/auth', authLimiter, routerAuth(usuarioController))
apiV1.use('/users', routerUsers(usuarioController))
apiV1.use('/barbershops', routerBarbershop(barbeariaController))
apiV1.use('/barbershops/:barbershopId/professionals', routerProfissional(profissionalController))

app.use('/api/v1', apiV1)

app.use(errorHandler)

export default app
