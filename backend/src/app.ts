import express, { Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { apiLimiter, authLimiter } from './shared/middlewares/rateLimiter'
import { errorHandler } from './shared/middlewares/errorHandler'
import { routerAuth, routerUsers } from './usuarios/adapters/routes/usuario.routes'
import { routerBarbershop } from './barbershops/adapters/routes/barbershop.routes'
import { routerProfissional } from './professionals/adapters/routes/professional.routes'
import { routerServico } from './services/adapters/routes/service.routes'
import { routerAgendamento } from './agendamentos/adapters/routes/agendamento.routes'
import { UsuarioController } from './usuarios/adapters/controllers/UsuarioController'
import { BarbeariaController } from './barbershops/adapters/controllers/BarbeariaController'
import { BusinessHoursController } from './barbershops/adapters/controllers/BusinessHoursController'
import { SupabaseBusinessHoursRepository } from './barbershops/infrastructure/repositories/SupabaseBusinessHoursRepository'
import { CriarHorarioFuncionamentoUseCase } from './barbershops/use-cases/CriarHorarioFuncionamentoUseCase'
import { ListarHorariosFuncionamentoUseCase } from './barbershops/use-cases/ListarHorariosFuncionamentoUseCase'
import { ProfissionalController } from './professionals/adapters/controllers/ProfissionalController'
import { ServicoController } from './services/adapters/controllers/ServicoController'
import { AgendamentoController } from './agendamentos/adapters/controllers/AgendamentoController'
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
import { BuscarProfissionalUseCase } from './professionals/use-cases/BuscarProfissionalUseCase'
import { SupabaseServicoRepository } from './services/infrastructure/repositories/SupabaseServicoRepository'
import { CadastrarServicoUseCase } from './services/use-cases/CadastrarServicoUseCase'
import { ListarServicosUseCase } from './services/use-cases/ListarServicosUseCase'
import { ListarAgendaProfissionalUseCase } from './agendamentos/use-cases/ListarAgendaProfissionalUseCase'
import { SupabaseAgendamentoRepository } from './agendamentos/infrastructure/repositories/SupabaseAgendamentoRepository'
import { routerIndisponibilidade } from './unavailabilities/adapters/routes/unavailability.routes'
import { IndisponibilidadeController } from './unavailabilities/adapters/controllers/IndisponibilidadeController'
import { SupabaseIndisponibilidadeRepository } from './unavailabilities/infrastructure/repositories/SupabaseIndisponibilidadeRepository'
import { RegistrarIndisponibilidadeUseCase } from './unavailabilities/use-cases/RegistrarIndisponibilidadeUseCase'
import { RemoverIndisponibilidadeUseCase } from './unavailabilities/use-cases/RemoverIndisponibilidadeUseCase'

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

const businessHoursRepository = new SupabaseBusinessHoursRepository()
const criarHorarioFuncionamentoUseCase = new CriarHorarioFuncionamentoUseCase(businessHoursRepository)
const listarHorariosFuncionamentoUseCase = new ListarHorariosFuncionamentoUseCase(businessHoursRepository)
const businessHoursController = new BusinessHoursController(
  criarHorarioFuncionamentoUseCase,
  listarHorariosFuncionamentoUseCase
)

const profissionalRepository = new SupabaseProfissionalRepository()
const cadastrarProfissionalUseCase = new CadastrarProfissionalUseCase(
  profissionalRepository,
  usuarioRepository,
  barbeariaRepository
)
const listarProfissionaisUseCase = new ListarProfissionaisUseCase(profissionalRepository, barbeariaRepository)
const buscarProfissionalUseCase = new BuscarProfissionalUseCase(profissionalRepository, barbeariaRepository)
const profissionalController = new ProfissionalController(
  cadastrarProfissionalUseCase,
  listarProfissionaisUseCase,
  buscarProfissionalUseCase
)

const servicoRepository = new SupabaseServicoRepository()
const cadastrarServicoUseCase = new CadastrarServicoUseCase(servicoRepository, barbeariaRepository)
const listarServicosUseCase = new ListarServicosUseCase(servicoRepository, barbeariaRepository)
const servicoController = new ServicoController(cadastrarServicoUseCase, listarServicosUseCase)

const agendamentoRepository = new SupabaseAgendamentoRepository()
const listarAgendaProfissionalUseCase = new ListarAgendaProfissionalUseCase(agendamentoRepository)
const agendamentoController = new AgendamentoController(
  listarAgendaProfissionalUseCase,
  profissionalRepository
)

const indisponibilidadeRepository = new SupabaseIndisponibilidadeRepository()
const registrarIndisponibilidadeUseCase = new RegistrarIndisponibilidadeUseCase(
  indisponibilidadeRepository,
  profissionalRepository,
  barbeariaRepository
)
const removerIndisponibilidadeUseCase = new RemoverIndisponibilidadeUseCase(
  indisponibilidadeRepository,
  profissionalRepository,
  barbeariaRepository
)
const indisponibilidadeController = new IndisponibilidadeController(
  registrarIndisponibilidadeUseCase,
  removerIndisponibilidadeUseCase
)

// Rotas — versionadas sob /api/v1 (endpoints.md)
const apiV1 = Router()
apiV1.use('/auth', authLimiter, routerAuth(usuarioController))
apiV1.use('/users', routerUsers(usuarioController))
apiV1.use('/barbershops', routerBarbershop(barbeariaController, businessHoursController))
apiV1.use('/barbershops/:barbershopId/professionals', routerProfissional(profissionalController))
apiV1.use('/barbershops/:barbershopId/services', routerServico(servicoController))
apiV1.use('/agendamentos', routerAgendamento(agendamentoController))
apiV1.use(
  '/barbershops/:barbershopId/professionals/:professionalId/unavailability',
  routerIndisponibilidade(indisponibilidadeController)
)

app.use('/api/v1', apiV1)

app.use(errorHandler)

export default app
