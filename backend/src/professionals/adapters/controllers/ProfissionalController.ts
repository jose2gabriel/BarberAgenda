import { Request, Response, NextFunction } from 'express'
import { ICadastrarProfissionalUseCase } from '../../domain/interfaces/ICadastrarProfissionalUseCase'
import { IListarProfissionaisUseCase } from '../../domain/interfaces/IListarProfissionaisUseCase'
import { IBuscarProfissionalUseCase } from '../../domain/interfaces/IBuscarProfissionalUseCase'
import { IAtualizarProfissionalUseCase } from '../../domain/interfaces/IAtualizarProfissionalUseCase'
import { IRemoverProfissionalUseCase } from '../../domain/interfaces/IRemoverProfissionalUseCase'
import { AppError } from '../../../shared/errors/AppError'

export class ProfissionalController {
  constructor(
    private readonly cadastrarProfissionalUseCase: ICadastrarProfissionalUseCase,
    private readonly listarProfissionaisUseCase: IListarProfissionaisUseCase,
    private readonly buscarProfissionalUseCase: IBuscarProfissionalUseCase,
    private readonly atualizarProfissionalUseCase: IAtualizarProfissionalUseCase,
    private readonly removerProfissionalUseCase: IRemoverProfissionalUseCase
  ) {}

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

  // RF004 — Listagem de profissionais da barbearia
  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profissionais = await this.listarProfissionaisUseCase.executar(req.params.barbershopId as string)
      res.status(200).json(profissionais)
    } catch (error) {
      next(error)
    }
  }

  // RF026 — Dados do profissional (detalhe)
  async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profissional = await this.buscarProfissionalUseCase.executar(
        req.params.barbershopId as string,
        req.params.id as string
      )
      res.status(200).json(profissional)
    } catch (error) {
      next(error)
    }
  }

  // Edição de profissional (owner)
  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      const { name, phone, specialty } = req.body

      const profissional = await this.atualizarProfissionalUseCase.executar({
        barbershopId: req.params.barbershopId as string,
        professionalId: req.params.id as string,
        ownerId: req.usuario.id,
        name,
        phone,
        specialty,
      })

      res.status(200).json(profissional)
    } catch (error) {
      next(error)
    }
  }

  // Remoção de profissional (owner)
  async remover(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuário não autenticado.', 401, 'UNAUTHORIZED')
      }

      await this.removerProfissionalUseCase.executar({
        barbershopId: req.params.barbershopId as string,
        professionalId: req.params.id as string,
        ownerId: req.usuario.id,
      })

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
