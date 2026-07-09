import { Router } from 'express'
import { AgendamentoController } from '../controllers/AgendamentoController'
import { autenticar } from '../../../shared/middlewares/autenticar'

export function routerAgendamento(controller: AgendamentoController) {
  const router = Router()

  router.get('/professional/:professionalId', autenticar, (req, res, next) =>
    controller.listarAgenda(req, res, next)
  )

  return router
}
