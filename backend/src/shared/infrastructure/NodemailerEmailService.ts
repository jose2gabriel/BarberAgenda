import nodemailer from 'nodemailer'
import { IEmailService } from '../interfaces/IEmailService'

/**
 * Implementação do envio de e-mail via Gmail (SMTP), usando Nodemailer.
 * Não exige domínio próprio nem verificação de DNS — só uma conta Gmail
 * e uma "senha de app" gerada em https://myaccount.google.com/apppasswords
 *
 * Variáveis de ambiente necessárias (ver .env.example):
 *   EMAIL_USER      -> conta Gmail que vai enviar (ex: barberagenda@gmail.com)
 *   EMAIL_APP_PASSWORD -> senha de app de 16 dígitos (não é a senha normal da conta)
 */
export class NodemailerEmailService implements IEmailService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  })

  async enviarEmailRecuperacaoSenha(destinatario: string, linkRedefinicao: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"Barber Agenda" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: 'Recuperação de senha — Barber Agenda',
      html: `
        <p>Você solicitou a redefinição da sua senha no Barber Agenda.</p>
        <p><a href="${linkRedefinicao}">Clique aqui para criar uma nova senha</a></p>
        <p>Este link expira em 30 minutos. Se você não pediu isso, pode ignorar este e-mail.</p>
      `,
    })
  }
}
