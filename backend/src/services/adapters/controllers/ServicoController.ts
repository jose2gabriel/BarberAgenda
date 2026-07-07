import { Request, Response, NextFunction } from 'express'
import { ICadastrarServicoUseCase } from '../../domain/interfaces/ICadastrarServicoUseCase'
import { AppError } from '../../../shared/errors/AppError'

export class ServicoController {
  constructor(private readonly cadastrarServicoUseCase: ICadastrarServicoUseCase) {}

  // RF014 — Cadastro de serviços da barbearia (owner)
  async cadastrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const { name, description, durationMinutes, price } = req.body

      const servico = await this.cadastrarServicoUseCase.executar({
        name,
        description,
        durationMinutes,
        price,
        barbershopId: req.params.barbershopId as string,
        ownerId: req.usuario.id,
      })

      res.status(201).json(servico)
    } catch (error) {
      next(error)
    }
  }
}
