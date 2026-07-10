import { Router } from 'express'
import { ProfissionalController } from '../controllers/ProfissionalController'
import { autenticar } from '../../../shared/middlewares/autenticar'

/**
 * Monta-se em app.use('/professionals', routerProfissionalMe(controller)).
 * Rota top-level (fora de /barbershops/:barbershopId) porque o cliente
 * ainda não sabe o barbershopId — é justamente o que ela descobre.
 */
export function routerProfissionalMe(controller: ProfissionalController) {
  const router = Router()

  router.get('/me', autenticar, (req, res, next) => controller.buscarMeuProfissional(req, res, next))

  return router
}
