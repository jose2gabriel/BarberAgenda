import { Request, Response, NextFunction } from 'express'
import { ICadastrarProfissionalUseCase } from '../../domain/interfaces/ICadastrarProfissionalUseCase'
import { AppError } from '../../../shared/errors/AppError'

export class ProfissionalController {
  constructor(private readonly cadastrarProfissionalUseCase: ICadastrarProfissionalUseCase) {}

  // RF003 — Cadastro de profissionais na barbearia (owner)
  async cadastrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const { name, email, phone, password, specialty } = req.body

      const profissional = await this.cadastrarProfissionalUseCase.executar({
        name,
        email,
        phone,
        password,
        specialty,
        barbershopId: req.params.barbershopId as string,
        ownerId: req.usuario.id,
      })

      res.status(201).json(profissional)
    } catch (error) {
      next(error)
    }
  }
}
