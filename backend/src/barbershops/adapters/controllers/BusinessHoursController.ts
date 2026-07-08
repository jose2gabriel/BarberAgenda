import { Request, Response } from 'express'
import { CriarHorarioFuncionamentoUseCase } from '../../use-cases/CriarHorarioFuncionamentoUseCase'
import { ListarHorariosFuncionamentoUseCase } from '../../use-cases/ListarHorariosFuncionamentoUseCase'

export class BusinessHoursController {
  constructor(
    private readonly criarHorarioUseCase: CriarHorarioFuncionamentoUseCase,
    private readonly listarHorariosUseCase: ListarHorariosFuncionamentoUseCase
  ) {}

  async criar(req: Request, res: Response): Promise<Response> {
    const horario = await this.criarHorarioUseCase.executar(req.body)
    return res.status(201).json(horario)
  }

  async listar(req: Request, res: Response): Promise<Response> {
    const { barbershopId } = req.params
    const horarios = await this.listarHorariosUseCase.executar(barbershopId)
    return res.json(horarios)
  }
}
