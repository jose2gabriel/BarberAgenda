import { Request, Response, NextFunction } from 'express'
import { ICriarBarbeariaUseCase } from '../../domain/interfaces/ICriarBarbeariaUseCase'
import { AppError } from '../../../shared/errors/AppError'

export class BarbeariaController {
  constructor(private readonly criarBarbeariaUseCase: ICriarBarbeariaUseCase) {}

  async criar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, address, phone } = req.body
      
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }
      
      const ownerId = req.usuario.id

      const barbearia = await this.criarBarbeariaUseCase.executar({
        name,
        address,
        phone,
        ownerId,
      })

      res.status(201).json(barbearia)
    } catch (error) {
      next(error)
    }
  }
}
