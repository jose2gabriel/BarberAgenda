import { Router } from 'express'
import { ProfissionalController } from '../controllers/ProfissionalController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { cadastrarProfissionalSchema } from '../schemas/ProfissionalSchema'

/** Monta-se em app.use('/barbershops/:barbershopId/professionals', routerProfissional(controller)) */
export function routerProfissional(controller: ProfissionalController) {
  const router = Router({ mergeParams: true })

  // RF003 — Cadastro de profissionais na barbearia (owner)
  router.post('/', autenticar, validate(cadastrarProfissionalSchema), (req, res, next) =>
    controller.cadastrar(req, res, next)
  )

  return router
}
