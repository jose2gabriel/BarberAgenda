import { Router } from 'express'
import { ServicoController } from '../controllers/ServicoController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { cadastrarServicoSchema } from '../schemas/ServicoSchema'

/** Monta-se em app.use('/barbershops/:barbershopId/services', routerServico(controller)) */
export function routerServico(controller: ServicoController) {
  const router = Router({ mergeParams: true })

  // RF014 — Cadastro de serviços da barbearia (owner)
  router.post('/', autenticar, validate(cadastrarServicoSchema), (req, res, next) =>
    controller.cadastrar(req, res, next)
  )

  // RF015 — Seleção de serviço (listagem)
  router.get('/', autenticar, (req, res, next) => controller.listar(req, res, next))

  return router
}
