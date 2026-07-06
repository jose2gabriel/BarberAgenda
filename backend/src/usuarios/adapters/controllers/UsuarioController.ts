// usuarios/adapters/controllers/UsuarioController.ts
import { Request, Response, NextFunction } from 'express'
import { ICadastrarUsuarioUseCase } from '../../domain/interfaces/ICadastrarUsuarioUseCase'
import { IAutenticarUsuarioUseCase } from '../../domain/interfaces/IAutenticarUsuarioUseCase'
import { IBuscarUsuarioUseCase } from '../../domain/interfaces/IBuscarUsuarioUseCase'
import { IEncerrarSessaoUseCase } from '../../domain/interfaces/IEncerrarSessaoUseCase'
import { IAtualizarUsuarioUseCase } from '../../domain/interfaces/IAtualizarUsuarioUseCase'
import { ISolicitarRecuperacaoSenhaUseCase } from '../../domain/interfaces/ISolicitarRecuperacaoSenhaUseCase'
import { IRedefinirSenhaUseCase } from '../../domain/interfaces/IRedefinirSenhaUseCase'
import { IExcluirContaUseCase } from '../../domain/interfaces/IExcluirContaUseCase'

export class UsuarioController {
  constructor(
    private readonly cadastrarUsuarioUseCase: ICadastrarUsuarioUseCase,
    private readonly autenticarUsuarioUseCase: IAutenticarUsuarioUseCase,
    private readonly buscarUsuarioUseCase: IBuscarUsuarioUseCase,
    private readonly encerrarSessaoUseCase: IEncerrarSessaoUseCase,
    private readonly atualizarUsuarioUseCase: IAtualizarUsuarioUseCase,
    private readonly solicitarRecuperacaoSenhaUseCase: ISolicitarRecuperacaoSenhaUseCase,
    private readonly redefinirSenhaUseCase: IRedefinirSenhaUseCase,
    private readonly excluirContaUseCase: IExcluirContaUseCase
  ) { }

  async cadastrar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await this.cadastrarUsuarioUseCase.executar(req.body)
      return res.status(201).json({ usuario })
    } catch (err) {
      next(err)
    }
  }

  async excluirConta(req: Request, res: Response, next: NextFunction) {
    try {
      await this.excluirContaUseCase.execute(req.usuario!.id)
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await this.autenticarUsuarioUseCase.executar(req.body)
      return res.status(200).json(resultado)
    } catch (err) {
      next(err)
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await this.buscarUsuarioUseCase.executar(req.usuario!.id)
      return res.status(200).json({ usuario })
    } catch (err) {
      next(err)
    }
  }

  // RF018 — logout é client-side no MVP (ver usuarios.md)
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await this.encerrarSessaoUseCase.executar()
      return res.status(200).json(resultado)
    } catch (err) {
      next(err)
    }
  }

  // RF019 — Atualização de dados (nome, telefone e/ou senha)
  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await this.atualizarUsuarioUseCase.executar(req.usuario!.id, req.body)
      return res.status(200).json({ usuario })
    } catch (err) {
      next(err)
    }
  }

  // RF030 (etapa 1) — Solicitar recuperação de senha
  async esqueciSenha(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await this.solicitarRecuperacaoSenhaUseCase.executar(req.body)
      return res.status(200).json(resultado)
    } catch (err) {
      next(err)
    }
  }

  // RF030 (etapa 2) — Redefinir senha com o token recebido por e-mail
  async redefinirSenha(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await this.redefinirSenhaUseCase.executar(req.body)
      return res.status(200).json(resultado)
    } catch (err) {
      next(err)
    }
  }
}
