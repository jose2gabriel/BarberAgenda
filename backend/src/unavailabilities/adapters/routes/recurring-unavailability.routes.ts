import { Router } from 'express'
import { IndisponibilidadeRecorrenteController } from '../controllers/IndisponibilidadeRecorrenteController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { registrarIndisponibilidadeRecorrenteSchema } from '../schemas/IndisponibilidadeRecorrenteSchema'

/** Monta-se em app.use('/barbershops/:barbershopId/professionals/:professionalId/recurring-unavailability', ...) */
export function routerIndisponibilidadeRecorrente(controller: IndisponibilidadeRecorrenteController) {
  const router = Router({ mergeParams: true })

  // Lista indisponibilidades recorrentes do profissional
  router.get('/', autenticar, (req, res, next) => controller.listar(req, res, next))

  // Registra indisponibilidade recorrente (profissional próprio ou owner da barbearia)
  router.post('/', autenticar, validate(registrarIndisponibilidadeRecorrenteSchema), (req, res, next) =>
    controller.registrar(req, res, next)
  )

  // Remove indisponibilidade recorrente
  router.delete('/:uid', autenticar, (req, res, next) => controller.remover(req, res, next))

  return router
}
