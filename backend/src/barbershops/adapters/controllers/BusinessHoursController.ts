import { Request, Response, NextFunction } from 'express'
import { CriarHorarioFuncionamentoUseCase } from '../../use-cases/CriarHorarioFuncionamentoUseCase'
import { ListarHorariosFuncionamentoUseCase } from '../../use-cases/ListarHorariosFuncionamentoUseCase'

export class BusinessHoursController {
  constructor(
    private readonly criarHorarioUseCase: CriarHorarioFuncionamentoUseCase,
    private readonly listarHorariosUseCase: ListarHorariosFuncionamentoUseCase
  ) {}

  async criar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const horario = await this.criarHorarioUseCase.executar(req.body)
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
