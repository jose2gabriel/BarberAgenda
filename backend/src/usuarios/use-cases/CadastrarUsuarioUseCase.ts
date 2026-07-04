// usuarios/use-cases/CadastrarUsuarioUseCase.ts
import bcrypt from 'bcrypt'
import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { ICadastrarUsuarioUseCase } from '../domain/interfaces/ICadastrarUsuarioUseCase'
import { CadastroDTO, UsuarioResponseDTO } from '../adapters/dtos/UsuarioDTO'
import { paraUsuarioPublico } from '../domain/entidades/Usuario'
import { AppError } from '../../shared/errors/AppError'


export class CadastrarUsuarioUseCase implements ICadastrarUsuarioUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async executar(dados: CadastroDTO): Promise<UsuarioResponseDTO> {
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(dados.email)

    if (usuarioExistente) {
      throw new AppError('E-mail já cadastrado.', 409, 'EMAIL_ALREADY_EXISTS')
    }

    const SALT_ROUNDS = 10
    const passwordHash = await bcrypt.hash(dados.password, SALT_ROUNDS)

    // Todo novo usuário recebe o perfil `cliente` por padrão (usuarios.md)
    const usuarioCriado = await this.usuarioRepository.criar({
      name: dados.name,
      email: dados.email,
      phone: dados.phone,
      passwordHash,
      role: 'cliente',
    })

    return paraUsuarioPublico(usuarioCriado)
  }
}