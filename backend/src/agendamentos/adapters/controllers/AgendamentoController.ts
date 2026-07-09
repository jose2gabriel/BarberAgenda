import { Request, Response, NextFunction } from 'express'
import { IListarAgendaProfissionalUseCase } from '../../domain/interfaces/IListarAgendaProfissionalUseCase'
import { IProfissionalRepository } from '../../../professionals/domain/interfaces/IProfissionalRepository'

export class AgendamentoController {
  constructor(
    private readonly listarAgendaProfissionalUseCase: IListarAgendaProfissionalUseCase,
    private readonly profissionalRepository: IProfissionalRepository
  ) { }

  async listarAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const professionalId = req.params.professionalId as string
      const agendamentos = await this.listarAgendaProfissionalUseCase.executar(professionalId)
      return res.status(200).json({ agendamentos })
    } catch (err) {
      next(err)
    }
  }
}

