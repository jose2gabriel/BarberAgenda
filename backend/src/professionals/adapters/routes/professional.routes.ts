import { Router } from 'express'
import { ProfissionalController } from '../controllers/ProfissionalController'
import { validate } from '../../../shared/middlewares/validate'
import { autenticar } from '../../../shared/middlewares/autenticar'
import {
  cadastrarProfissionalSchema,
  atualizarProfissionalSchema,
  tornarSeProfissionalSchema,
} from '../schemas/ProfissionalSchema'

/** Monta-se em app.use('/barbershops/:barbershopId/professionals', routerProfissional(controller)) */
export function routerProfissional(controller: ProfissionalController) {
  const router = Router({ mergeParams: true })

  // RF003 — Cadastro de profissionais na barbearia (owner)
  router.post('/', autenticar, validate(cadastrarProfissionalSchema), (req, res, next) =>
    controller.cadastrar(req, res, next)
  )

  // Owner se auto-cadastra como profissional na própria barbearia
  router.post('/me', autenticar, validate(tornarSeProfissionalSchema), (req, res, next) =>
    controller.tornarSeProfissional(req, res, next)
  )

  // RF004 — Listagem de profissionais da barbearia
  router.get('/', autenticar, (req, res, next) => controller.listar(req, res, next))

  // RF026 — Dados do profissional (detalhe)
  router.get('/:id', autenticar, (req, res, next) => controller.buscarPorId(req, res, next))

  // Edição de profissional (owner)
  router.patch('/:id', autenticar, validate(atualizarProfissionalSchema), (req, res, next) =>
    controller.atualizar(req, res, next)
  )

  // Remoção de profissional (owner)
  router.delete('/:id', autenticar, (req, res, next) => controller.remover(req, res, next))

  return router
}
