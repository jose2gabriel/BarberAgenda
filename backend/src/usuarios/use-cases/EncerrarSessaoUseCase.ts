import { IEncerrarSessaoUseCase } from '../domain/interfaces/IEncerrarSessaoUseCase'

/**
 * RF018 — Encerramento de Sessão.
 * No MVP, o logout é responsabilidade do cliente (descarta o token localmente).
 * Este use case existe só para manter a consistência arquitetural do módulo
 * (toda ação do controller passa por um use case) — não há regra de negócio
 * nem acesso a repositório aqui. Ver usuarios.md para o motivo dessa decisão.
 */
export class EncerrarSessaoUseCase implements IEncerrarSessaoUseCase {
  async executar(): Promise<{ message: string }> {
    return { message: 'Sessão encerrada. Descarte o token no cliente.' }
  }
}
