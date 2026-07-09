import { Router } from 'express'
import { AgendamentoController } from '../controllers/AgendamentoController'
import { autenticar, autorizar } from '../../../shared/middlewares/autenticar'
import { validate } from '../../../shared/middlewares/validate'
import { criarAgendamentoSchema } from '../schemas/AgendamentoSchema'

export function routerAgendamento(controller: AgendamentoController) {
  const router = Router()

  router.get('/professional/:professionalId', autenticar, (req, res, next) =>
    controller.listarAgenda(req, res, next)
  )

  // RF006, RF007 — Cria agendamento (só cliente pode agendar, ADR-007)
  router.post('/', autenticar, autorizar('cliente'), validate(criarAgendamentoSchema), (req, res, next) =>
    controller.criar(req, res, next)
  )

  // RF008 — Cancelamento
  router.patch('/:id/cancelar', autenticar, (req, res, next) =>
    controller.cancelar(req, res, next)
  )

  return router
}
