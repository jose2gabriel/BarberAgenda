import { Request, Response, NextFunction } from 'express'
import { IListarAgendaProfissionalUseCase } from '../../domain/interfaces/IListarAgendaProfissionalUseCase'
import { ICriarAgendamentoUseCase } from '../../domain/interfaces/ICriarAgendamentoUseCase'
import { IProfissionalRepository } from '../../../professionals/domain/interfaces/IProfissionalRepository'
import { AppError } from '../../../shared/errors/AppError'

export class AgendamentoController {
  constructor(
    private readonly listarAgendaProfissionalUseCase: IListarAgendaProfissionalUseCase,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly criarAgendamentoUseCase: ICriarAgendamentoUseCase
  ) {}

  async listarAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const professionalId = req.params.professionalId as string
      const agendamentos = await this.listarAgendaProfissionalUseCase.executar(professionalId)
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
}
