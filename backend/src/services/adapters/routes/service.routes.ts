import { Router } from 'express'
import { ServicoController } from '../controllers/ServicoController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar, autorizar } from '../../../shared/middlewares/autenticar'
import { cadastrarServicoSchema, atualizarServicoSchema } from '../schemas/ServicoSchema'

/** Monta-se em app.use('/barbershops/:barbershopId/services', routerServico(controller)) */
export function routerServico(controller: ServicoController) {
  const router = Router({ mergeParams: true })

  // RF014 — Cadastro de serviços da barbearia (owner)
  router.post('/', autenticar, autorizar('owner'), validate(cadastrarServicoSchema), (req, res, next) =>
    controller.cadastrar(req, res, next)
  )

  // RF014 — Atualização de serviços da barbearia (owner)
  router.patch('/:id', autenticar, autorizar('owner'), validate(atualizarServicoSchema), (req, res, next) =>
    controller.atualizar(req, res, next)
  )

  // RF015 — Seleção de serviço (listagem)
  router.get('/', autenticar, (req, res, next) => controller.listar(req, res, next))

  return router
}

