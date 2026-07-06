import { Router } from 'express'
import { BarbeariaController } from '../controllers/BarbeariaController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { criarBarbeariaSchema } from '../schemas/BarbeariaSchema'

export function routerBarbershop(controller: BarbeariaController) {
  const router = Router()

  // RF031 — Criação de barbearia
  router.post('/', autenticar, validate(criarBarbeariaSchema), (req, res, next) =>
    controller.criar(req, res, next)
  )

  return router
}
