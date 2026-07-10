import { Router } from 'express'
import { ServicoController } from '../controllers/ServicoController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { cadastrarServicoSchema, atualizarServicoSchema } from '../schemas/ServicoSchema'

/**
 * Monta-se em app.use('/barbershops/:barbershopId/services', routerServico(controller)).
 * Sem `autorizar('owner')`: a checagem de dono já é feita nos use cases
 * (ownerId da barbearia vs. usuário logado), igual a professionals/barbershops.
 * Isso evita depender da claim `role` do JWT, que fica desatualizada logo
 * após a promoção a owner (RF031), quebrando o fluxo guiado de cadastro.
 */
export function routerServico(controller: ServicoController) {
  const router = Router({ mergeParams: true })

  // RF014 — Cadastro de serviços da barbearia (owner)
  router.post('/', autenticar, validate(cadastrarServicoSchema), (req, res, next) =>
    controller.cadastrar(req, res, next)
  )

  // RF014 — Atualização de serviços da barbearia (owner)
  router.patch('/:id', autenticar, validate(atualizarServicoSchema), (req, res, next) =>
    controller.atualizar(req, res, next)
  )

  // RF015 — Seleção de serviço (listagem)
  router.get('/', autenticar, (req, res, next) => controller.listar(req, res, next))

  return router
}

