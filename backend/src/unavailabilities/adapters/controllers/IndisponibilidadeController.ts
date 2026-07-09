import { Request, Response, NextFunction } from 'express'
import { IRegistrarIndisponibilidadeUseCase } from '../../domain/interfaces/IRegistrarIndisponibilidadeUseCase'
import { IRemoverIndisponibilidadeUseCase } from '../../domain/interfaces/IRemoverIndisponibilidadeUseCase'
import { AppError } from '../../../shared/errors/AppError'

export class IndisponibilidadeController {
  constructor(
    private readonly registrarIndisponibilidadeUseCase: IRegistrarIndisponibilidadeUseCase,
    private readonly removerIndisponibilidadeUseCase: IRemoverIndisponibilidadeUseCase
  ) {}

  // RF024 — Registra indisponibilidade
  async registrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const { startsAt, endsAt, reason } = req.body

      const indisponibilidade = await this.registrarIndisponibilidadeUseCase.executar({
        barbershopId: req.params.barbershopId as string,
        professionalId: req.params.professionalId as string,
        requesterId: req.usuario.id,
        startsAt,
        endsAt,
        reason,
      })

      res.status(201).json(indisponibilidade)
    } catch (error) {
      next(error)
    }
  }

  // RF024 — Remove indisponibilidade
  async remover(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      await this.removerIndisponibilidadeUseCase.executar({
        barbershopId: req.params.barbershopId as string,
        professionalId: req.params.professionalId as string,
        unavailabilityId: req.params.uid as string,
        requesterId: req.usuario.id,
      })

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
