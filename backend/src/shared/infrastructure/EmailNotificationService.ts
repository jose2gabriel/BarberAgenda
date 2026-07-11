import nodemailer from 'nodemailer'
import { DadosNotificacaoAgendamento, INotificationService } from '../interfaces/INotificationService'

function formatarData(date: string): string {
  const [ano, mes, dia] = date.split('-')
  return `${dia}/${mes}/${ano}`
}

/**
 * Adapter de e-mail pra RF012/RF013 (ver INotificationService). Mesmo
 * padrão de NodemailerEmailService (transporter Gmail próprio, HTML
 * inline, sem template engine) — classe separada porque é um contrato
 * (INotificationService) diferente do de recuperação de senha
 * (IEmailService), mesmo reaproveitando a mesma infraestrutura SMTP.
 */
export class EmailNotificationService implements INotificationService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  })

  async notificarAgendamentoCriado(dados: DadosNotificacaoAgendamento): Promise<void> {
    await this.transporter.sendMail({
      from: `"Barber Agenda" <${process.env.EMAIL_USER}>`,
      to: dados.clienteEmail,
      subject: 'Agendamento confirmado — Barber Agenda',
      html: `
        <p>Olá, ${dados.clienteNome}!</p>
        <p>Seu agendamento foi confirmado:</p>
        <ul>
          <li><strong>Serviço:</strong> ${dados.servicoNome}</li>
          <li><strong>Profissional:</strong> ${dados.profissionalNome}</li>
          <li><strong>Data:</strong> ${formatarData(dados.date)} às ${dados.startTime}</li>
        </ul>
        <p>Até lá!</p>
      `,
    })
  }

  async notificarAgendamentoCancelado(dados: DadosNotificacaoAgendamento): Promise<void> {
    await this.transporter.sendMail({
      from: `"Barber Agenda" <${process.env.EMAIL_USER}>`,
      to: dados.clienteEmail,
      subject: 'Agendamento cancelado — Barber Agenda',
      html: `
        <p>Olá, ${dados.clienteNome}.</p>
        <p>Seu agendamento foi cancelado:</p>
        <ul>
          <li><strong>Serviço:</strong> ${dados.servicoNome}</li>
          <li><strong>Profissional:</strong> ${dados.profissionalNome}</li>
          <li><strong>Data:</strong> ${formatarData(dados.date)} às ${dados.startTime}</li>
        </ul>
        <p>Se quiser reagendar, acesse o Barber Agenda.</p>
      `,
    })
  }
}
