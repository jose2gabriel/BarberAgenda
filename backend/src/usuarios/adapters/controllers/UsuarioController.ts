// usuarios/adapters/controllers/UsuarioController.ts
import { Request, Response, NextFunction } from 'express'
import { ICadastrarUsuarioUseCase } from '../../domain/interfaces/ICadastrarUsuarioUseCase'

export class UsuarioController {
  constructor(private readonly cadastrarUsuarioUseCase: ICadastrarUsuarioUseCase) {}

  async cadastrar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await this.cadastrarUsuarioUseCase.executar(req.body)
      return res.status(201).json({ usuario })
    } catch (err) {
      next(err)
    }
  }
}