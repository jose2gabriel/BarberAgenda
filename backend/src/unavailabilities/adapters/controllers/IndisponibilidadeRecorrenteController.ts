import { Request, Response, NextFunction } from 'express'
import { IRegistrarIndisponibilidadeRecorrenteUseCase } from '../../domain/interfaces/IRegistrarIndisponibilidadeRecorrenteUseCase'
import { IRemoverIndisponibilidadeRecorrenteUseCase } from '../../domain/interfaces/IRemoverIndisponibilidadeRecorrenteUseCase'
import { IListarIndisponibilidadesRecorrentesUseCase } from '../../domain/interfaces/IListarIndisponibilidadesRecorrentesUseCase'
import { AppError } from '../../../shared/errors/AppError'

export class IndisponibilidadeRecorrenteController {
  constructor(
    private readonly registrarIndisponibilidadeRecorrenteUseCase: IRegistrarIndisponibilidadeRecorrenteUseCase,
    private readonly removerIndisponibilidadeRecorrenteUseCase: IRemoverIndisponibilidadeRecorrenteUseCase,
    private readonly listarIndisponibilidadesRecorrentesUseCase: IListarIndisponibilidadesRecorrentesUseCase
  ) {}

  // Lista indisponibilidades recorrentes registradas do profissional
  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lista = await this.listarIndisponibilidadesRecorrentesUseCase.executar(req.params.professionalId as string)
      res.status(200).json(lista)
    } catch (error) {
      next(error)
    }
  }

  // Registra indisponibilidade recorrente (profissional próprio ou owner da barbearia)
  async registrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const { dayOfWeek, startTime, endTime, reason } = req.body

      const indisponibilidade = await this.registrarIndisponibilidadeRecorrenteUseCase.executar({
        barbershopId: req.params.barbershopId as string,
        professionalId: req.params.professionalId as string,
        requesterId: req.usuario.id,
        dayOfWeek,
        startTime,
        endTime,
        reason,
      })

      res.status(201).json(indisponibilidade)
    } catch (error) {
      next(error)
    }
  }

  // Remove indisponibilidade recorrente
  async remover(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      await this.removerIndisponibilidadeRecorrenteUseCase.executar({
        barbershopId: req.params.barbershopId as string,
        professionalId: req.params.professionalId as string,
        recurringUnavailabilityId: req.params.uid as string,
        requesterId: req.usuario.id,
      })

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
