import { Request, Response, NextFunction } from 'express'
import { IListarAgendaProfissionalUseCase } from '../../domain/interfaces/IListarAgendaProfissionalUseCase'
import { ICriarAgendamentoUseCase } from '../../domain/interfaces/ICriarAgendamentoUseCase'
import { ICancelarAgendamentoUseCase } from '../../domain/interfaces/ICancelarAgendamentoUseCase'
import { IConcluirAgendamentoUseCase } from '../../use-cases/ConcluirAgendamentoUseCase'
import { IReagendarAgendamentoUseCase } from '../../domain/interfaces/IReagendarAgendamentoUseCase'
import { ListarAgendamentosClienteUseCase } from '../../use-cases/ListarAgendamentosClienteUseCase'
import { IProfissionalRepository } from '../../../professionals/domain/interfaces/IProfissionalRepository'
import { AppError } from '../../../shared/errors/AppError'

export class AgendamentoController {
  constructor(
    private readonly listarAgendaProfissionalUseCase: IListarAgendaProfissionalUseCase,
    private readonly listarAgendamentosClienteUseCase: ListarAgendamentosClienteUseCase,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly criarAgendamentoUseCase: ICriarAgendamentoUseCase,
    private readonly cancelarAgendamentoUseCase: ICancelarAgendamentoUseCase,
    private readonly concluirAgendamentoUseCase: IConcluirAgendamentoUseCase,
    private readonly reagendarAgendamentoUseCase: IReagendarAgendamentoUseCase
  ) {}

  // RF011 — Consulta de agenda (profissional)
  async listarMinhaAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }
      if (!req.usuario.roles.includes('profissional')) {
        throw new AppError('Acesso não autorizado.', 403, 'FORBIDDEN')
      }

      // Precisamos buscar o ID do profissional associado ao usuário
      const profissional = await this.profissionalRepository.buscarPorUserId(req.usuario.id)
      if (!profissional) {
        throw new AppError('Profissional não encontrado para este usuário.', 404, 'PROFESSIONAL_NOT_FOUND')
      }

      const agendamentos = await this.listarAgendaProfissionalUseCase.executar(profissional.id)
      return res.status(200).json({ agendamentos })
    } catch (err) {
      next(err)
    }
  }

  // RF010 — Consulta de agendamentos (cliente)
  async listarMeusAgendamentos(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const agendamentos = await this.listarAgendamentosClienteUseCase.executar(req.usuario.id)
      return res.status(200).json({ agendamentos })
    } catch (err) {
      next(err)
    }
  }

  // RF006, RF007 — Cria agendamento com validação de conflito
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const { professionalId, serviceId, date, time } = req.body

      const agendamento = await this.criarAgendamentoUseCase.executar({
        clientId: req.usuario.id,
        professionalId,
        serviceId,
        date,
        time,
      })

      return res.status(201).json(agendamento)
    } catch (err) {
      next(err)
    }
  }

  // RF008 — Cancelamento
  async cancelar(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const id = req.params.id as string

      await this.cancelarAgendamentoUseCase.executar(id, req.usuario.id)

      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }

  // RF029 — Conclusão
  async concluir(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const id = req.params.id as string

      await this.concluirAgendamentoUseCase.executar(id, req.usuario.id)

      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }

  // RF009 — Reagendamento
  async reagendar(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const id = req.params.id as string
      const { date, time } = req.body

      const agendamento = await this.reagendarAgendamentoUseCase.executar(id, {
        date,
        time,
      })

      return res.status(200).json(agendamento)
    } catch (err) {
      next(err)
    }
  }
}
