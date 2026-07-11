import { Router } from 'express'
import { IndisponibilidadeController } from '../controllers/IndisponibilidadeController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { registrarIndisponibilidadeSchema } from '../schemas/IndisponibilidadeSchema'

/** Monta-se em app.use('/barbershops/:barbershopId/professionals/:professionalId/unavailability', routerIndisponibilidade(controller)) */
export function routerIndisponibilidade(controller: IndisponibilidadeController) {
  const router = Router({ mergeParams: true })

  // Lista indisponibilidades do profissional
  router.get('/', autenticar, (req, res, next) => controller.listar(req, res, next))

  // RF024 — Registra indisponibilidade (profissional próprio ou owner da barbearia)
  router.post('/', autenticar, validate(registrarIndisponibilidadeSchema), (req, res, next) =>
    controller.registrar(req, res, next)
  )

  // RF024 — Remove indisponibilidade
  router.delete('/:uid', autenticar, (req, res, next) => controller.remover(req, res, next))

  return router
}
