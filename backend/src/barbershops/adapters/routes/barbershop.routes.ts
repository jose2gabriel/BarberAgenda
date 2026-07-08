import { Router } from 'express'
import { BarbeariaController } from '../controllers/BarbeariaController'
import { BusinessHoursController } from '../controllers/BusinessHoursController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import { criarBarbeariaSchema, atualizarBarbeariaSchema } from '../schemas/BarbeariaSchema'
import { CriarHorarioSchema } from '../schemas/BusinessHoursSchema'

export function routerBarbershop(
  controller: BarbeariaController,
  businessHoursController: BusinessHoursController
) {
  const router = Router()

  // RF031 — Criação de barbearia
  router.post('/', autenticar, validate(criarBarbeariaSchema), (req, res, next) =>
    controller.criar(req, res, next)
  )

  // RF032 — Listagem de barbearias
  router.get('/', autenticar, (req, res, next) => controller.listar(req, res, next))

  // RF032 — Detalhes de uma barbearia
  router.get('/:id', autenticar, (req, res, next) => controller.buscarPorId(req, res, next))

  // RF033 — Atualização de dados da barbearia (owner)
  router.patch('/:id', autenticar, validate(atualizarBarbeariaSchema), (req, res, next) =>
    controller.atualizar(req, res, next)
  )

  // RF020 — Horários de funcionamento
  router.post('/:id/hours', autenticar, validate(CriarHorarioSchema), (req, res, next) =>
    businessHoursController.criar(req, res, next)
  )
  router.get('/:id/hours', autenticar, (req, res, next) =>
    businessHoursController.listar(req, res, next)
  )

  return router
}
