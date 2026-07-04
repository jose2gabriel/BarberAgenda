// usuarios/adapters/routes/usuario.routes.ts
import { Router } from 'express'
import { UsuarioController } from '../controllers/UsuarioController'
import { validate } from '../../../shared/middlewares/validate'
import { cadastroSchema } from '../schemas/UsuarioSchema'

export function routerUsuario(controller: UsuarioController) {
  const router = Router()

  // RF001 — Cadastro de usuário
  router.post('/register', validate(cadastroSchema), (req, res, next) => controller.cadastrar(req, res, next))

  return router
}