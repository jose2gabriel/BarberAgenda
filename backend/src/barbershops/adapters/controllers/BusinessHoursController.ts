import { Request, Response, NextFunction } from 'express'
import { CriarHorarioFuncionamentoUseCase } from '../../use-cases/CriarHorarioFuncionamentoUseCase'
import { ListarHorariosFuncionamentoUseCase } from '../../use-cases/ListarHorariosFuncionamentoUseCase'
import { AppError } from '../../../shared/errors/AppError'

export class BusinessHoursController {
  constructor(
    private readonly criarHorarioUseCase: CriarHorarioFuncionamentoUseCase,
    private readonly listarHorariosUseCase: ListarHorariosFuncionamentoUseCase
  ) {}

  async criar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const horario = await this.criarHorarioUseCase.executar({ ...req.body, ownerId: req.usuario.id })
      return res.status(201).json(horario)
    } catch (err) {
      next(err)
    }
  }

  async listar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const id = req.params.id as string
      const horarios = await this.listarHorariosUseCase.executar(id)
      return res.json(horarios)
    } catch (err) {
      next(err)
    }
  }
}
