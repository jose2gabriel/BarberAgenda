import { Router } from 'express'
import { AgendamentoController } from '../controllers/AgendamentoController'
import { autenticar, autorizar } from '../../../shared/middlewares/autenticar'
import { validate } from '../../../shared/middlewares/validate'
import { criarAgendamentoSchema, reagendarAgendamentoSchema } from '../schemas/AgendamentoSchema'

export function routerAgendamento(controller: AgendamentoController) {
  const router = Router()

  router.get('/professional/:professionalId', autenticar, (req, res, next) =>
    controller.listarAgenda(req, res, next)
  )

  // RF010 — Consulta de agendamentos (cliente)
  router.get('/', autenticar, (req, res, next) =>
    controller.listarMeusAgendamentos(req, res, next)
  )

  // RF011 — Consulta de agenda (profissional)
  router.get('/minha-agenda', autenticar, autorizar('profissional'), (req, res, next) =>
    controller.listarMinhaAgenda(req, res, next)
  )

  // RF006, RF007 — Cria agendamento (só cliente pode agendar, ADR-007)
  router.post('/', autenticar, autorizar('cliente'), validate(criarAgendamentoSchema), (req, res, next) =>
    controller.criar(req, res, next)
  )
...

  // RF008 — Cancelamento
  router.patch('/:id/cancelar', autenticar, (req, res, next) =>
    controller.cancelar(req, res, next)
  )

  // RF029 — Conclusão
  router.patch('/:id/concluir', autenticar, (req, res, next) =>
    controller.concluir(req, res, next)
  )

  // RF009 — Reagendamento
  router.patch('/:id/reschedule', autenticar, validate(reagendarAgendamentoSchema), (req, res, next) =>
    controller.reagendar(req, res, next)
  )

  return router
}
