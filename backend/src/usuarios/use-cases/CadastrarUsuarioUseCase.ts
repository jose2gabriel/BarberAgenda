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
    // Normaliza o e-mail para evitar duplicidade por diferença de caixa
    // (ex: "Joao@Gmail.com" vs "joao@gmail.com") — coluna é VARCHAR, não citext.
    const email = dados.email.trim().toLowerCase()

    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email)

    if (usuarioExistente) {
      throw new AppError('E-mail já cadastrado.', 409, 'EMAIL_ALREADY_EXISTS')
    }

    const SALT_ROUNDS = 10
    const passwordHash = await bcrypt.hash(dados.password, SALT_ROUNDS)

    // Todo novo usuário recebe o perfil `cliente` por padrão (usuarios.md).
    // O perfil `owner` só é atribuído ao criar uma barbearia (RF031, Módulo 2) —
    // nunca no cadastro.
    const usuarioCriado = await this.usuarioRepository.criar({
      name: dados.name,
      email,
      phone: dados.phone,
      passwordHash,
      role: 'cliente',
    })

    // Usuário recém-criado nunca é owner nem profissional ainda — sem
    // necessidade de consultar barbershops/professionals aqui.
    return { ...paraUsuarioPublico(usuarioCriado), roles: ['cliente'] }
  }
}