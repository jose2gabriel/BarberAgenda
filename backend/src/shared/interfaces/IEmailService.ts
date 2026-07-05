export interface IEmailService {
  enviarEmailRecuperacaoSenha(destinatario: string, linkRedefinicao: string): Promise<void>
}
